import * as React from 'react';
import classNames from 'classnames';
import { ObjectInterface } from '../_utils/interfaces';
import Icon from '../icon';
import './style/link-button.less';
import { CommonButtonProps } from './Button';

export interface LinkButtonProps extends CommonButtonProps {
  /** 设置按钮大小 */
  size?: 'compact';
  /** 按钮失效状态 */
  disabled?: boolean;
  /** 相当于 a 链接的 target 属性，href 存在时生效 */
  target?: string;
  /** 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 */
  href?: string;
  /** 设置按钮左边Icon */
  leftIcon?: string;
  /** 设置按钮右边Icon */
  rightIcon?: string;
  /** 设置按钮状态 */
  status?: 'danger' | 'plain';
}

const prefixCls = 'dmc-btn-link';

export const LinkButton = React.forwardRef<HTMLElement, LinkButtonProps>((props, ref) => {
  const {
    size,
    className,
    disabled,
    href,
    target,
    style,
    onClick,
    children,
    status,
    leftIcon,
    rightIcon,
    ...restProps
  } = props;

  const btnCls = classNames(
    prefixCls,
    {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-danger`]: status === 'danger',
      [`${prefixCls}-plain`]: status === 'plain',
    },
    className,
  );

  const [View, viewProps]: [React.ElementType, ObjectInterface] =
    href && !disabled ? ['a', { href, target }] : ['div', {}];

  return (
    <View
      {...restProps}
      {...viewProps}
      className={btnCls}
      onClick={disabled ? undefined : onClick}
      style={style}
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      ref={ref as any}
    >
      {leftIcon && <Icon icon={leftIcon} className={`${prefixCls}-left-icon`} />}
      {children}
      {rightIcon && <Icon icon={rightIcon} className={`${prefixCls}-right-icon`} />}
    </View>
  );
});

LinkButton.displayName = 'LinkButton';
export default LinkButton;

const LinkButtonMemo = React.memo(LinkButton);
LinkButtonMemo.displayName = 'LinkButtonMemo';
export { LinkButtonMemo };
