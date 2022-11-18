import * as React from 'react';
import Draggable, { DraggableBounds, DraggableEventHandler } from 'react-draggable';
import Icon from '../icon';
import './style/draggable-wrap.less';
import { randomUuid } from '../_utils/stringUtil';

export interface DraggableWrapProps {
  /** 设置移动方向 */
  axis?: 'both' | 'x' | 'y' | 'none';
  /** 指定运动边界 */
  bounds?: DraggableBounds | string | false;
  /** default to react-draggable 类名 */
  defaultClassName?: string;
  /** default to react-draggable-dragging 类名 */
  defaultClassNameDragging?: string;
  /** default to react-draggable-dragged 类名 */
  defaultClassNameDragged?: string;
  /** 指定拖动项的起始位置为' x '和' y ' */
  defaultPosition?: { x: number; y: number };
  /** 起始位置的偏移量。用于给出初始位置 */
  positionOffset?: { x: number | string; y: number | string };
  /** 受控，用于直接控制元素的位置 */
  position?: { x: number; y: number };
  /** 如果设置为' true '，将允许拖动非左键点击。 */
  allowAnyClick?: boolean;
  /** 指定用于防止拖动初始化的选择器。 */
  cancel?: string;
  /** 不调用任何拖动处理程序。 */
  disabled?: boolean;
  /** 在主体中添加一个样式来禁用用户选择。这样可以防止在整个页面中被选中。 */
  enableUserSelectHack?: boolean;
  /** 提供自己的父类参与计算 */
  offsetParent?: HTMLElement;
  /** 指定拖拽应该对齐的x和y */
  grid?: [number, number];
  /** 指定用作启动拖动的句柄的选择器。 */
  handle?: string;
  /** 当拖动开始时调用 */
  onStart?: DraggableEventHandler;
  /** 拖动时调用。 */
  onDrag?: DraggableEventHandler;
  /** 拖动停止时调用。 */
  onStop?: DraggableEventHandler;
  /** 当用户鼠标按下时调用。 */
  onMouseDown?: (e: MouseEvent) => void;
  /** 指定拖动此元素的画布的比例。 */
  scale?: number;
  children?: React.ReactNode;
  /** 隐藏拖动处理器 */
  hideHandler?: boolean;
}

const prefixCls = 'dmc-draggable-wrap';

export const DraggableWrap = React.forwardRef<unknown, DraggableWrapProps>((props, ref) => {
  const { children, hideHandler, ...draggableProps } = props;
  const hasHandle = 'handle' in draggableProps;
  const rand = React.useMemo(() => randomUuid(), []);
  return (
    <Draggable
      {...draggableProps}
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      ref={ref as any}
      handle={hasHandle ? draggableProps.handle : `div[data-handle="${rand}"]`}
    >
      {hasHandle ? (
        children
      ) : (
        <div className={prefixCls}>
          {!hideHandler && (
            <Icon data-handle={rand} icon="drag-handle-cornor" className={`${prefixCls}-handle`} />
          )}
          {children}
        </div>
      )}
    </Draggable>
  );
});

DraggableWrap.defaultProps = {
  axis: 'both',
  bounds: 'body',
};

DraggableWrap.displayName = 'DraggableWrap';
export default DraggableWrap;

const DraggableWrapMemo = React.memo(DraggableWrap);
DraggableWrapMemo.displayName = 'DraggableWrapMemo';
export { DraggableWrapMemo };
