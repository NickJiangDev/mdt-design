import * as React from 'react';
import Button, { ButtonProps } from '../button';
import Popover, { PopoverProps } from './Popover';

export interface PopoverButtonProps extends PopoverProps {
  /** 按钮文案 */
  buttonText: React.ReactNode;
  /** 按钮属性 */
  buttonProps?: ButtonProps;
  /** 自定义渲染button */
  renderButton?: (actived: boolean) => React.ReactElement;
}

export interface PopoverButtonRef {
  toggle: (vis: boolean) => void;
}

export const PopoverButton = React.forwardRef<PopoverButtonRef, PopoverButtonProps>(
  (props, ref) => {
    const { buttonText, buttonProps, renderButton, onVisibleChange, ...popverProps } = props;
    const [actived, setActived] = React.useState(false);

    React.useImperativeHandle(
      ref,
      () => {
        return {
          toggle: (vis: boolean) => setActived(vis),
        };
      },
      [],
    );

    const handleVisibleChange = (vis: boolean) => {
      setActived(vis);
      onVisibleChange && onVisibleChange(vis);
    };

    const button = renderButton ? (
      renderButton(actived)
    ) : (
      <Button {...(buttonProps || {})} disabled={actived}>
        {buttonText}
      </Button>
    );

    return (
      <Popover {...popverProps} visible={actived} onVisibleChange={handleVisibleChange}>
        {button}
      </Popover>
    );
  },
);

PopoverButton.defaultProps = {
  placement: 'bottom',
  trigger: 'click',
};

PopoverButton.displayName = 'PopoverButton';
export default PopoverButton;
