import addEventListener from 'rc-util/lib/Dom/addEventListener';
import raf from 'rc-util/lib/raf';
import Affix from './index';

export type BindElement = HTMLElement | Window | null | undefined;

export function getTargetRect(target: BindElement): DOMRect {
  return target !== window
    ? (target as HTMLElement).getBoundingClientRect()
    : ({ top: 0, bottom: window.innerHeight } as DOMRect);
}

export function getFixedTop(placeholderReact: DOMRect, targetRect: DOMRect, offsetTop?: number) {
  if (offsetTop !== undefined && targetRect.top > placeholderReact.top - offsetTop) {
    return offsetTop + targetRect.top;
  }
  return undefined;
}

export function getFixedBottom(
  placeholderReact: DOMRect,
  targetRect: DOMRect,
  offsetBottom?: number,
) {
  if (offsetBottom !== undefined && targetRect.bottom < placeholderReact.bottom + offsetBottom) {
    const targetBottomOffset = window.innerHeight - targetRect.bottom;
    return offsetBottom + targetBottomOffset;
  }
  return undefined;
}

// ======================== Observer ========================
const TRIGGER_EVENTS = [
  'resize',
  'scroll',
  'touchstart',
  'touchmove',
  'touchend',
  'pageshow',
  'load',
];

interface ObserverEntity {
  target: HTMLElement | Window;
  affixList: Affix[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventHandlers: { [eventName: string]: any };
}

let observerEntities: ObserverEntity[] = [];

export function getObserverEntities() {
  // Only used in test env. Can be removed if refactor.
  return observerEntities;
}

export function addObserveTarget(target: HTMLElement | Window | null, affix: Affix): void {
  if (!target) return;

  let entity: ObserverEntity | undefined = observerEntities.find((item) => item.target === target);

  if (entity) {
    entity.affixList.push(affix);
  } else {
    entity = {
      target,
      affixList: [affix],
      eventHandlers: {},
    };
    observerEntities.push(entity);

    // Add listener
    TRIGGER_EVENTS.forEach((eventName) => {
      entity!.eventHandlers[eventName] = addEventListener(target, eventName, () => {
        entity!.affixList.forEach((targetAffix) => {
          targetAffix.lazyUpdatePosition();
        });
      });
    });
  }
}

export function removeObserveTarget(affix: Affix): void {
  const observerEntity = observerEntities.find((oriObserverEntity) => {
    const hasAffix = oriObserverEntity.affixList.some((item) => item === affix);
    if (hasAffix) {
      oriObserverEntity.affixList = oriObserverEntity.affixList.filter((item) => item !== affix);
    }
    return hasAffix;
  });

  if (observerEntity && observerEntity.affixList.length === 0) {
    observerEntities = observerEntities.filter((item) => item !== observerEntity);

    // Remove listener
    TRIGGER_EVENTS.forEach((eventName) => {
      const handler = observerEntity.eventHandlers[eventName];
      if (handler && handler.remove) {
        handler.remove();
      }
    });
  }
}

export function throttleByAnimationFrame(fn: (...args: []) => void) {
  let requestId: number | null;

  const later = (args: []) => () => {
    requestId = null;
    fn(...args);
  };

  const throttled = (...args: []) => {
    if (requestId == null) {
      requestId = raf(later(args));
    }
  };

  throttled.cancel = () => raf.cancel(requestId!);

  return throttled;
}

export function throttleByAnimationFrameDecorator() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function throttle(target: any, key: string, descriptor: any) {
    const fn = descriptor.value;
    let definingProperty = false;
    return {
      configurable: true,
      get() {
        // In IE11 calling Object.defineProperty has a side-effect of evaluating the
        // getter for the property which is being replaced. This causes infinite
        // recursion and an "Out of stack space" error.
        // eslint-disable-next-line no-prototype-builtins
        if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
          /* istanbul ignore next */
          return fn;
        }

        const boundFn = throttleByAnimationFrame(fn.bind(this));
        definingProperty = true;
        Object.defineProperty(this, key, {
          value: boundFn,
          configurable: true,
          writable: true,
        });
        definingProperty = false;
        return boundFn;
      },
    };
  };
}
