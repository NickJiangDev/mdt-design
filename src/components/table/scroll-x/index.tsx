import * as React from 'react';
import { useSetState, useDebounceEffect, useUpdateEffect } from 'ahooks';
import './index.less';
import { useLongPress } from 'use-long-press';
import { IconButton } from '@/components/button';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import isNumber from 'lodash/isNumber';
import { useMouse } from 'react-use';

const prefix = 'mdt-table-scroll-x';
export interface ScrollXProps {
  event$?: EventEmitter<number>; // ahooks useEventEmitter 实例
  allWidth: number; // 全部长度
  width: number; // 容器宽度
  scrollWidth: number; // 整个滚动条长度
  stepWidth: number;
}
const ScrollX = React.memo((props: ScrollXProps) => {
  const { event$, allWidth, width, stepWidth } = props;
  const [state, setState] = useSetState({
    minX: 0, // 最小偏移量
    maxX: 0, // 最大偏移量
    originX: 0, // 长按初始化x
    offsetX: 0, // 拖动中偏移量
    x: 0, // 实际x
    pressStart: false, // 是否开启长按
    barWidth: 0, // 滚动条bar的长度
    scrollWidth: props.scrollWidth, // 整个滚动条长度
    scrollMax: 0, // table 在 x 轴 可滚动范围
  });
  const ref = React.useRef<HTMLDivElement>(null);
  const { minX, maxX } = state;
  const mouse = useMouse(ref);

  useDebounceEffect(() => {
    const barWidth = (width / allWidth) * state.scrollWidth;
    const maxX = state.scrollWidth - barWidth + 2;
    const scrollMax = allWidth - width + 2;
    setState({ barWidth, maxX, scrollMax });
  }, [allWidth, setState, state.scrollWidth, width]);
  const callback = React.useCallback(() => {
    // alert("Long pressed!");
  }, []);

  const setX = (num: number) => {
    setState({ x: state.x + num });
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const bind = useLongPress(callback, {
    onStart: (event) => {
      // console.log('Press started', state);
      const target = event?.target as HTMLDivElement;
      if (target.className === `${prefix}-bar`) {
        setState({ pressStart: true, originX: mouse.docX });
      } else {
        const { left } = target.getBoundingClientRect();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { pageX } = event || {};
        if (isNumber(pageX - left) && !state.pressStart) {
          setX(pageX - left - state.x - state.barWidth / 2);
          setState({ pressStart: true, originX: mouse.docX });
        }
      }
    },
    onFinish: () => {
      // console.log('Long press finished');
      const originX = 0;
      const offsetX = 0;
      let x = state.x + state.offsetX;
      if (x < minX) x = minX;
      if (x > maxX) x = maxX;
      setState({ pressStart: false, originX, offsetX, x });
    },
    onCancel: () => {
      return;
      // console.log('Press cancelled');
      // const originX = 0;
      // const offsetX = 0;
      // let x = state.x + state.offsetX;
      // if (x < minX) x = minX;
      // if (x > maxX) x = maxX;
      // setState({ pressStart: false, originX, offsetX, x });
    },
    onMove: () => {
      if (state.pressStart) {
        // 偏移量
        const offsetX = mouse.docX - state.originX;
        setState({ offsetX });
      }
    },
    threshold: 100,
    captureEvent: true,
    cancelOnMovement: false,
    detect: 'both',
  });
  event$?.useSubscription((value) => {
    if (isNumber(value) && !state.pressStart) {
      const { scrollMax, maxX } = state;
      let proportion = value / scrollMax;
      proportion = proportion > 1 ? 1 : proportion;
      setState({ x: proportion * maxX || 0 });
    }
  });
  let translateX = state.x + state.offsetX;
  if (translateX < minX) translateX = minX;
  if (translateX > maxX) translateX = maxX;
  useUpdateEffect(() => {
    const { scrollMax, maxX } = state;
    const scrollLeft = (translateX / maxX) * scrollMax;
    event$?.emit(scrollLeft);
  }, [translateX]);
  useUpdateEffect(() => {
    setState({ scrollWidth: props.scrollWidth });
  }, [props.scrollWidth]);
  return (
    <div ref={ref} className={prefix} style={{ width: state.scrollWidth + 42 }}>
      <IconButton
        className={`${prefix}-left-icon`}
        type="only-icon"
        icon="arrow-left"
        onClick={() => {
          let x = state.x - maxX * (stepWidth / allWidth);
          x = x < 0 ? 0 : x;
          setState({ x });
        }}
      />
      <div className={`${prefix}-content`} {...bind} style={{ width: state.scrollWidth }}>
        <div
          style={{ transform: `translateX(${translateX}px)`, width: state.barWidth }}
          className={`${prefix}-bar`}
        ></div>
      </div>
      <IconButton
        className={`${prefix}-right-icon`}
        type="only-icon"
        icon="arrow-right"
        onClick={() => {
          let x = state.x + maxX * (stepWidth / allWidth);
          x = x < 0 ? 0 : x;
          setState({ x });
        }}
      />
    </div>
  );
});

export default ScrollX;
