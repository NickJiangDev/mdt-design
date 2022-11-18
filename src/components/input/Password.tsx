import * as React from 'react';
import classNames from 'classnames';
import useStaticCallback from '@/hooks/useStaticCallback';
import IconButton from '../button/IconButton';
import Input, { InputType } from './Input';

export interface PasswordProps {
  type?: 'menu-bg' | 'assist-bg';
  size?: 'compact';
  status?: 'warning' | 'error' | 'success';
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  block?: boolean;
  onChange?: (e: React.ChangeEvent) => void;
  onPressEnter?: (e: KeyboardEvent) => void;
  onFocus?: (e: React.ChangeEvent) => void;
  onBlur?: (e: React.ChangeEvent) => void;
  allowClear?: boolean;
  prefix?: React.ReactNode;
  prefixIcon?: string;
  prefixAddon?: React.ReactNode;
  suffix?: React.ReactNode;
  suffixIcon?: string;
  suffixAddon?: React.ReactNode;
  centered?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  visibilityToggle?: boolean;
}

const prefixCls = 'dmc-input-password';

const Password: React.FC<PasswordProps> = ({
  className,
  visibilityToggle,
  suffix,
  ...restProps
}) => {
  const [val, setVal] = React.useState({ on: false, autoFocus: 0 });
  const toggle = useStaticCallback(() => {
    setVal({ on: !val.on, autoFocus: val.autoFocus + 1 });
  });

  const [icon, type] = val.on ? ['visibility-on', 'text'] : ['visibility-off', 'password'];
  const vsIcon = React.useMemo(() => <IconButton icon={icon} type="only-icon" onClick={toggle} />, [
    icon,
    toggle,
  ]);

  return (
    <Input
      {...restProps}
      inputType={type as InputType}
      suffix={visibilityToggle ? vsIcon : suffix}
      autoFocus={val.autoFocus}
      className={classNames(prefixCls, className)}
    />
  );
};

Password.defaultProps = {
  visibilityToggle: true,
};

const PasswordMemo: React.FC<PasswordProps> = React.memo(Password);

PasswordMemo.displayName = 'PasswordMemo';
export { PasswordMemo };

Password.displayName = 'Password';
export default Password;
