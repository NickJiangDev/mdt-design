import { Direction } from 'rc-tree/lib/interface';
import React from 'react';

const offset = 4;

const dropIndicatorRender: (props: {
  dropPosition: -1 | 0 | 1;
  dropLevelOffset: number;
  indent: number;
  prefixCls: string;
  direction: Direction;
}) => React.ReactNode = (props) => {
  const {
    dropPosition,
    dropLevelOffset,
    prefixCls,
    indent,
    direction = 'ltr',
    ...restProps
  } = props;
  const startPosition = direction === 'ltr' ? 'left' : 'right';
  const endPosition = direction === 'ltr' ? 'right' : 'left';
  const style: React.CSSProperties = {
    [startPosition]: -dropLevelOffset * indent + offset,
    [endPosition]: 0,
  };
  switch (dropPosition) {
    case -1:
      style.top = -3;
      break;
    case 1:
      style.bottom = -3;
      break;
    default:
      // dropPosition === 0
      style.bottom = -3;
      style[startPosition] = indent + offset;
      break;
  }
  return <div {...restProps} style={style} className={`${prefixCls}-drop-indicator`} />;
};

export default dropIndicatorRender;
