import * as React from 'react';
import classNames from 'classnames';

export interface TimeLineItemProps {
  /** 类名 */
  className?: string;
  /** 点替换 */
  dot?: React.ReactNode;
  /** 位置 */
  position?: 'left' | 'right';
  /** 样式 */
  style?: React.CSSProperties;
  /** 文案 */
  label?: React.ReactNode;
  children?: React.ReactNode;
}

const prefixCls = 'dmc-timeline-item';

const TimelineItem = React.forwardRef<HTMLLIElement, TimeLineItemProps>((props, ref) => {
  const { className, dot, children, position, style, label, ...restProps } = props;

  const itemClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${position}`]: position,
      [`${prefixCls}-custom`]: dot,
    },
    className,
  );

  return (
    <li {...restProps} ref={ref} style={style} className={itemClassName}>
      {label && <div className={`${prefixCls}-label`}>{label}</div>}
      <div className={`${prefixCls}-tail`} />
      <div className={`${prefixCls}-head`}>{dot}</div>
      <div className={`${prefixCls}-content`}>{children}</div>
    </li>
  );
});

TimelineItem.displayName = 'TimelineItem';
export default TimelineItem;

const TimelineItemMemo = React.memo(TimelineItem);
TimelineItemMemo.displayName = 'TimelineItemMemo';
export { TimelineItemMemo };
