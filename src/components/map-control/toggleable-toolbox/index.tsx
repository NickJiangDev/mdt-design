import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { prefixCls, ToggleableToolboxLayoutDirection, ToggleableToolboxProps } from '../index';
import NormalToolbox from '../normal-toolbox';
import classnames from 'classnames';

const toggleableToolboxGap = 5;
const toolBoxWidth = 32;

const normalToolboxStyle: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
};

const ToggleableToolbox = React.memo<ToggleableToolboxProps>((props) => {
  const {
    id,
    onClick,
    subItems,
    layoutDirection = ToggleableToolboxLayoutDirection.right,
    style,
  } = props;

  const timeIdRef = useRef<number>();
  const enterDelayTimeIdRef = useRef<number>();

  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const [subItemsVisible, setSubItemsVisible] = useState(false);

  const layoutInColumn =
    layoutDirection === ToggleableToolboxLayoutDirection.top ||
    layoutDirection === ToggleableToolboxLayoutDirection.bottom;

  const handleMouseEnter = useCallback(() => {
    window.clearTimeout(timeIdRef.current);
    window.clearTimeout(enterDelayTimeIdRef.current);
    enterDelayTimeIdRef.current = window.setTimeout(() => setSubItemsVisible(true), 150);
  }, []);

  const handleMouseLeave = useCallback(() => {
    window.clearTimeout(enterDelayTimeIdRef.current);
    timeIdRef.current = window.setTimeout(() => {
      setSubItemsVisible(false);
    }, 300);
  }, []);

  const refCallback = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setContainer(node);
    }
  }, []);

  const initialStyle = useMemo<React.CSSProperties>(() => {
    if (container) {
      switch (layoutDirection) {
        case ToggleableToolboxLayoutDirection.top:
          return {
            top: `-${(subItems.length - 1) * (toolBoxWidth + toggleableToolboxGap)}px`,
            flexDirection: 'column-reverse',
          };
        case ToggleableToolboxLayoutDirection.right:
          return {};
        case ToggleableToolboxLayoutDirection.bottom:
          return {
            flexDirection: 'column',
          };
        case ToggleableToolboxLayoutDirection.left:
          return {
            left: `-${(subItems.length - 1) * (toolBoxWidth + toggleableToolboxGap)}px`,
            flexDirection: 'row-reverse',
          };
      }
    }
    return {};
  }, [container, layoutDirection, subItems.length]);

  const transitionStyle = useMemo<React.CSSProperties>(() => {
    const _transitionStyle = {
      opacity: 1,
      pointerEvents: 'auto',
      transition: 'transform 0.2s ease-in-out, opacity 0.5s',
    };
    switch (layoutDirection) {
      case ToggleableToolboxLayoutDirection.top:
        return {
          ...initialStyle,
          ..._transitionStyle,
          transform: `translateY(-${toolBoxWidth + toggleableToolboxGap}px)`,
        };
      case ToggleableToolboxLayoutDirection.right:
        return {
          ...initialStyle,
          ..._transitionStyle,
          transform: `translateX(${toolBoxWidth + toggleableToolboxGap}px)`,
        };
      case ToggleableToolboxLayoutDirection.bottom:
        return {
          ...initialStyle,
          ..._transitionStyle,
          transform: `translateY(${toolBoxWidth + toggleableToolboxGap}px)`,
        };
      case ToggleableToolboxLayoutDirection.left:
        return {
          ...initialStyle,
          ..._transitionStyle,
          transform: `translateX(-${toolBoxWidth + toggleableToolboxGap}px)`,
        };
      default:
        return {};
    }
  }, [initialStyle, layoutDirection]);

  useEffect(() => {
    return () => clearTimeout(timeIdRef.current);
  }, []);

  return (
    <div
      className={`${prefixCls}-toggleable-toolbox`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={refCallback}
    >
      <div
        className={classnames(`${prefixCls}-toggleable-toolbox-sub-items-container`, {
          'toggleable-toolbox-column-gap': layoutInColumn,
          'toggleable-toolbox-row-gap': !layoutInColumn,
        })}
        style={{
          ...initialStyle,
          ...(subItemsVisible ? transitionStyle : {}),
          ...style,
        }}
      >
        {subItems.map((item, index) => (
          <NormalToolbox {...item} id={`${id}-${index}`} key={item.id} />
        ))}
      </div>
      <NormalToolbox {...props} onClick={onClick} style={normalToolboxStyle} />
    </div>
  );
});

export default ToggleableToolbox;
