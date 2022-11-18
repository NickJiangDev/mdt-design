import * as React from 'react';
import classNames from 'classnames';
import './style/timeline.less';

export interface TimelineProps {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 模式 */
  mode?: 'alternate' | 'right';
  children?: React.ReactNode;
}

const prefixCls = 'dmc-timeline';

const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>((props, ref) => {
  const { children, className, mode, style, ...restProps } = props;

  const hasLabelItem = React.Children.toArray(children).some(
    (item) => !!(item as React.ReactElement)?.props?.label,
  );

  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-${mode}`]: mode,
      [`${prefixCls}-label`]: hasLabelItem,
    },
    className,
  );

  return (
    <ul {...restProps} ref={ref} style={style} className={classString}>
      {children}
    </ul>
  );
});

Timeline.displayName = 'Timeline';
export default Timeline;

const TimelineMemo = React.memo(Timeline);
TimelineMemo.displayName = 'TimelineMemo';
export { TimelineMemo };
