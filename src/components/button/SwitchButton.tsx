import * as React from 'react';
import classNames from 'classnames';
import './style/switch-button.less';
import { CommonButtonProps } from './Button';

export interface SwitchButtonProps extends CommonButtonProps {
  /** 设置按钮选中状态 */
  checked?: boolean;
}

const prefixCls = 'dmc-btn-switch';

export const SwitchButton = React.forwardRef<HTMLButtonElement, SwitchButtonProps>((props, ref) => {
  const { checked, className, style, onClick, children, htmlType, ...restProps } = props;
  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-checked`]: checked,
    },
    className,
  );

  return (
    <button
      {...restProps}
      type={htmlType}
      ref={ref}
      className={classes}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
});

SwitchButton.displayName = 'SwitchButton';
SwitchButton.defaultProps = {
  htmlType: 'button',
};
export default SwitchButton;

const SwitchButtonMemo = React.memo(SwitchButton);
SwitchButtonMemo.displayName = 'SwitchButtonMemo';
export { SwitchButtonMemo };
