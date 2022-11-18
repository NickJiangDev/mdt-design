import * as React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import './style/radio-button.less';

export interface RadioButtonProps {
  /** 大小 */
  size?: 'compact';
  /** 类名 */
  className?: string;
  /** 失效状态 */
  disabled?: boolean;
  /** 选中状态 */
  checked?: boolean;
  /** 默认选中状态 */
  defaultChecked?: boolean;
  /** 当前值 */
  value?: string;
  /** 选择回调 */
  onChange?: (value?: string) => void;
  /** 只图标按钮 */
  onlyIcon?: string;
  /** 左图标 */
  leftIcon?: string;
  /** 右图标 */
  rightIcon?: string;
  children?: React.ReactNode;
}

const prefixCls = 'dmc-radio-button';

const RadioButton = React.forwardRef<HTMLButtonElement, RadioButtonProps>((props, ref) => {
  const {
    size = 'normal',
    checked,
    defaultChecked,
    value,
    className,
    children,
    disabled,
    onChange,
    onlyIcon,
    leftIcon,
    rightIcon,
    ...restProps
  } = props;

  const val = !!('checked' in props ? checked : defaultChecked);
  const btnCls = classNames(
    prefixCls,
    {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-active`]: val,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-only-icon`]: onlyIcon,
    },
    className,
  );

  const node = onlyIcon ? (
    <Icon icon={onlyIcon} />
  ) : (
    <React.Fragment>
      {leftIcon && <Icon icon={leftIcon} className={`${prefixCls}-left-icon`} />}
      {children}
      {rightIcon && <Icon icon={rightIcon} className={`${prefixCls}-right-icon`} />}
    </React.Fragment>
  );

  const onClick = () => {
    onChange && onChange(value);
  };

  return (
    <button
      {...restProps}
      ref={ref}
      disabled={disabled}
      className={btnCls}
      onClick={disabled ? undefined : onClick}
    >
      {node}
    </button>
  );
});

RadioButton.displayName = 'RadioButton';
export default RadioButton;

const RadioButtonMemo = React.memo(RadioButton);
RadioButtonMemo.displayName = 'RadioButtonMemo';
export { RadioButtonMemo };
