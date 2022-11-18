import * as React from 'react';
import classNames from 'classnames';
import './style/dot.less';

export interface DotProps {
  /** 状态 */
  status?: 'error' | 'warning' | 'success' | 'canceled';
  /** 文案 */
  text?: string;
  /** 类名 */
  className?: string;
  children?: React.ReactNode;
}

const prefixCls = 'dmc-dot';

export const Dot = React.forwardRef<HTMLDivElement, DotProps>((props, ref) => {
  const { status, className, text, ...restProps } = props;
  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-${status}-status`]: status,
      [`${prefixCls}-has-text`]: text,
    },
    className,
  );

  return (
    <div {...restProps} ref={ref} className={cls}>
      <div className={`${prefixCls}-dot`} />
      {!!text && <div className={`${prefixCls}-text`}>{text}</div>}
    </div>
  );
});

Dot.displayName = 'Dot';
export default Dot;

const DotMemo = React.memo(Dot);
DotMemo.displayName = 'DotMemo';
export { DotMemo };
