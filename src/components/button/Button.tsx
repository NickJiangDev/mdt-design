import * as React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import './style/button.less';

export interface ButtonProps extends CommonButtonProps {
  /** 设置按钮类型 */
  type?: 'primary' | 'assist' | 'assist-bg';
  /** 设置按钮状态 */
  status?: 'danger' | 'success';
  /** 设置按钮大小 */
  size?: 'compact';
  /** 幽灵属性，使按钮背景透明 */
  ghost?: boolean;
  /** 激活状态 */
  actived?: boolean;
  /** 无边框属性 */
  withoutBorder?: boolean;
  /** 按钮失效状态 */
  disabled?: boolean;
  /** 设置按钮载入状态 */
  loading?: boolean;
  /** 设置按钮只载入，不显示内容状态 */
  onlyLoading?: boolean;
  /** 将按钮宽度调整为其父宽度的选项 */
  block?: boolean;
  /** 设置按钮左边Icon */
  leftIcon?: string;
  /** 设置按钮右边边Icon */
  rightIcon?: string;
  /** 只图标按钮 */
  onlyIcon?: string;
}

export interface CommonButtonProps {
  /** 点击按钮时的回调 */
  onClick?: (e: React.MouseEvent) => void;
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 设置 button 原生的 type 值 */
  htmlType?: 'submit' | 'reset' | 'button';
  /** 子组件 */
  children?: React.ReactNode;
}

const prefixCls = 'dmc-btn';
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    type,
    size,
    className,
    disabled,
    loading,
    onlyLoading,
    block,
    style,
    onClick,
    children,
    leftIcon,
    rightIcon,
    onlyIcon,
    ghost,
    actived,
    withoutBorder,
    status,
    htmlType,
    ...restProps
  } = props;

  const invalid = disabled || loading;
  const btnCls = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-danger`]: status === 'danger',
      [`${prefixCls}-success`]: status === 'success',
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-ghost`]: ghost,
      [`${prefixCls}-actived`]: actived,
      [`${prefixCls}-disabled`]: invalid,
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-without-border`]: withoutBorder,
    },
    className,
  );
  const containerCls = classNames(`${prefixCls}-container`, {
    [`${prefixCls}-container-loading`]: loading,
  });

  const node = loading ? (
    onlyLoading ? (
      <React.Fragment>
        <span className={`${prefixCls}-context`}>{children}</span>
        <div className={`${prefixCls}-icon-wrapper`}>
          <Icon icon="loading" className={`${prefixCls}-icon-loading`} />
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Icon icon="loading" className={`${prefixCls}-icon-loading`} />
        {children}
      </React.Fragment>
    )
  ) : onlyIcon ? (
    <Icon icon={onlyIcon} className={`${prefixCls}-only-icon`} />
  ) : (
    <React.Fragment>
      {leftIcon && <Icon icon={leftIcon} className={`${prefixCls}-left-icon`} />}
      {children}
      {rightIcon && <Icon icon={rightIcon} className={`${prefixCls}-right-icon`} />}
    </React.Fragment>
  );

  return (
    <button
      {...restProps}
      type={htmlType}
      ref={ref}
      disabled={invalid}
      className={btnCls}
      onClick={invalid ? undefined : onClick}
      style={style}
    >
      <span className={containerCls}>{node}</span>
      <span className={`${prefixCls}-bg`} />
    </button>
  );
});

Button.displayName = 'Button';
Button.defaultProps = {
  htmlType: 'button',
};
export default Button;

const ButtonMemo = React.memo(Button);
ButtonMemo.displayName = 'ButtonMemo';
export { ButtonMemo };
