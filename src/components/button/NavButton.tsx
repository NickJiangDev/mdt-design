import * as React from 'react';
import './style/nav-button.less';
import Button, { ButtonProps } from './Button';

export interface NavButtonProps extends Omit<ButtonProps, 'type'> {
  type?: 'danger' | 'success';
}

export const NavButton = React.forwardRef<HTMLButtonElement, NavButtonProps>((props, ref) => {
  const { type, ...restProps } = props;
  return <Button {...restProps} type="assist" status={type} size="compact" onlyLoading ref={ref} />;
});

NavButton.displayName = 'NavButton';
export default NavButton;

const NavButtonMemo = React.memo(NavButton);
NavButtonMemo.displayName = 'NavButtonMemo';
export { NavButtonMemo };
