import * as React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import './style/icon-button.less';
import { CommonButtonProps } from './Button';

export interface IconButtonProps extends CommonButtonProps {
  /** border: 边框模式, assist-bg: 辅助背景下按钮 */
  type?: 'border' | 'only-icon' | 'assist-bg' | 'assist-bg-border';
  /**	设置按钮大小 */
  size?: 'compact';
  /** 没有chirldren时，icon是必须项  */
  icon?: string;
  /** 幽灵属性，使按钮背景透明 */
  ghost?: boolean;
  /** 激活状态 */
  actived?: boolean;
  /**	按钮失效状态 */
  disabled?: boolean;
  /**	设置按钮下拉的样式 */
  dropdown?: boolean;
  /** 按钮下拉的Icon */
  dropDownIcon?: string;
}

export declare type IconButtonRefType = HTMLDivElement | HTMLButtonElement;

const prefixCls = 'dmc-btn-icon';

const defaultProps: {
  dropDownIcon: string;
  htmlType: 'submit' | 'reset' | 'button';
} = {
  dropDownIcon: 'arrow-down',
  htmlType: 'button',
};

export const IconButton = React.forwardRef<IconButtonRefType, IconButtonProps>((props, ref) => {
  const {
    type,
    size,
    icon,
    ghost,
    actived,
    disabled,
    className,
    onClick,
    dropdown,
    dropDownIcon,
    children,
    htmlType,
    ...restProps
  } = props as IconButtonProps & typeof defaultProps;

  const dropdownNode = dropdown ? (
    <Icon icon={dropDownIcon} className={`${prefixCls}-dropdown-icon`} />
  ) : null;

  const btnCls = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${size}`]: type === 'only-icon' ? false : size,
      [`${prefixCls}-actived`]: actived,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-ghost`]: ghost,
    },
    className,
  );
  const node = children ? children : <Icon icon={icon as string} className={`${prefixCls}-icon`} />;
  return (
    <button
      {...restProps}
      type={htmlType}
      className={btnCls}
      onClick={onClick}
      disabled={disabled}
      ref={ref as React.RefObject<HTMLButtonElement>}
    >
      {node}
      {dropdownNode}
    </button>
  );
});

IconButton.displayName = 'IconButton';
IconButton.defaultProps = defaultProps;
export default IconButton;

const IconButtonMemo = React.memo(IconButton);
IconButtonMemo.displayName = 'IconButtonMemo';
export { IconButtonMemo };
