import * as React from 'react';
import Tooltip, { TooltipProps } from '../tooltip';

const useCombinedRefs = (
  ...refs: Array<React.MutableRefObject<unknown> | ((instance: unknown) => void) | null>
) => {
  const targetRef = React.useRef();

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

const SliderTooltip = React.forwardRef<unknown, TooltipProps>((props, ref) => {
  const { visible } = props;
  const innerRef = React.useRef(null);
  const tooltipRef = useCombinedRefs(ref, innerRef);
  const rafRef = React.useRef<number | null>(null);

  const cancelKeepAlign = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    window.cancelAnimationFrame(rafRef.current!);
    rafRef.current = null;
  };

  const keepAlign = () => {
    if (rafRef.current !== null) {
      return;
    }
    rafRef.current = window.requestAnimationFrame(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (tooltipRef.current as any)?.forcePopupAlign();
      rafRef.current = null;
      keepAlign();
    });
  };

  React.useEffect(() => {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }
    return cancelKeepAlign;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return <Tooltip ref={tooltipRef} {...props} />;
});

export default SliderTooltip;
