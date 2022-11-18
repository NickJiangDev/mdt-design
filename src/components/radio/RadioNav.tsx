import * as React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import './style/radio-nav.less';

export interface RadioNavProps {
  /** 类名 */
  className?: string;
  /** 选中状态 */
  checked?: boolean;
  /** 默认选中状态 */
  defaultChecked?: boolean;
  /** 当前值 */
  value?: string;
  /** 选择回调 */
  onChange?: (value?: string) => void;
  /** 图标 */
  icon?: string;
  children?: React.ReactNode;
}

const prefixCls = 'dmc-radio-nav';

const RadioNav = React.forwardRef<HTMLDivElement, RadioNavProps>((props, ref) => {
  const {
    checked,
    defaultChecked,
    value,
    className,
    children,
    onChange,
    icon,
    ...restProps
  } = props;

  const val = !!('checked' in props ? checked : defaultChecked);
  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-active`]: val,
    },
    className,
  );

  const onClick = () => {
    onChange && onChange(value);
  };

  return (
    <div {...restProps} ref={ref} className={cls} onClick={onClick}>
      {children}
      {!!icon && <Icon icon={icon} className={`${prefixCls}-icon`} />}
    </div>
  );
});

RadioNav.displayName = 'RadioNav';
export default RadioNav;

const RadioNavMemo = React.memo(RadioNav);
RadioNavMemo.displayName = 'RadioNavMemo';
export { RadioNavMemo };
