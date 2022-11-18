import * as React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import './style/radio.less';

export interface RadioProps {
  /** 单选框类型 */
  type?: 'page-bg' | 'menu-bg' | 'assist-bg';
  /** 大小 */
  size?: 'compact';
  /** 类名 */
  className?: string;
  /** 失效状态 */
  disabled?: boolean;
  /** 选中状态 */
  checked?: boolean;
  /** 默认状态 */
  defaultChecked?: boolean;
  /** 当前值 */
  value?: string;
  /** 选择回调 */
  onChange?: (value?: string) => void;
  children?: React.ReactNode;
}

const prefixCls = 'dmc-radio';
const getIconAttr = (on: boolean): string[] => {
  return on ? ['radio-on', 'checked'] : ['radio-off', 'uncheck'];
};

export const Radio = React.forwardRef<HTMLDivElement, RadioProps>((props, ref) => {
  const {
    type,
    size,
    checked,
    defaultChecked,
    value,
    className,
    children,
    disabled,
    onChange,
    ...restProps
  } = props;
  const val = !!('checked' in props ? checked : defaultChecked);
  const wrapperCls = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-disabled`]: disabled,
    },
    className,
  );
  const [icon, status] = getIconAttr(val);

  const handleChange = () => {
    onChange && onChange(value);
  };

  return (
    <div
      {...restProps}
      ref={ref}
      className={wrapperCls}
      onClick={disabled ? undefined : handleChange}
    >
      <Icon icon={icon} className={`${prefixCls}-icon-${status}`} />
      {!!children && <span className={`${prefixCls}-info`}>{children}</span>}
    </div>
  );
});

Radio.displayName = 'Radio';
export default Radio;

const RadioMemo = React.memo(Radio);
RadioMemo.displayName = 'RadioMemo';
export { RadioMemo };
