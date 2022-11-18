import * as React from 'react';
import { useCallback, useMemo } from 'react';
import Icon from '@/components/icon';
import classNames from 'classnames';
import { LayoutDirection, ZoomToolbox } from '../index';
import { prefixCls } from '../index';

interface ZoomControlProps extends ZoomToolbox {
  displayDirection?: LayoutDirection;
}

const ZoomControl = React.memo<ZoomControlProps>(
  ({ zoom, displayDirection, reverseLayout, onValueClick, onZoomIn, onZoomOut, ...restProps }) => {
    const handleZoomIn = useCallback(() => {
      onZoomIn?.();
    }, [onZoomIn]);

    const handleZoomOut = useCallback(() => {
      onZoomOut?.();
    }, [onZoomOut]);

    const style = useMemo<React.CSSProperties>(
      () => ({
        flexDirection: reverseLayout
          ? displayDirection === LayoutDirection.row
            ? 'row-reverse'
            : 'column-reverse'
          : displayDirection === LayoutDirection.row
          ? 'row'
          : 'column',
      }),
      [displayDirection, reverseLayout],
    );

    return (
      <div
        {...restProps}
        className={classNames(`${prefixCls}-zoom`, {
          row: displayDirection === LayoutDirection.row,
          column: displayDirection === LayoutDirection.column,
        })}
        style={style}
      >
        <div className={`${prefixCls}-zoom-icon`} onClick={handleZoomIn}>
          <Icon icon="add" size={16} />
        </div>
        <div className={`${prefixCls}-zoom-line`} />
        <div className={`${prefixCls}-zoom-control`}>
          <div className={`${prefixCls}-zoom-control-text`} onClick={onValueClick}>
            {zoom}
          </div>
        </div>
        <div className={`${prefixCls}-zoom-line`} />
        <div className={`${prefixCls}-zoom-icon`} onClick={handleZoomOut}>
          <Icon icon="remove" size={16} />
        </div>
      </div>
    );
  },
);

export default ZoomControl;
