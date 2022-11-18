import * as React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import './style/toast-container.less';

export interface ToastContainerProps {
  /** 类型 */
  type: 'info' | 'error' | 'success' | 'warning';
  /** 消息文案 */
  message: string;
  /** 按钮文案 */
  buttonText?: string;
  /** 点击回调 */
  onClick?: (e: React.MouseEvent) => void;
  /** 关闭回调 */
  onClose?: () => void;
  /** 箭头显示 */
  withArrow?: boolean;
  /** 关闭显示 */
  withClose?: boolean;
}

const prefixCls = 'dmc-toast-container';
const iconMap = {
  info: 'info',
  error: 'alert',
  success: 'success',
  warning: 'alert',
};

const ToastContainer = React.forwardRef<HTMLDivElement, ToastContainerProps>((props, ref) => {
  const {
    type = 'info',
    message,
    buttonText,
    withArrow,
    onClick,
    onClose,
    withClose,
    ...restProps
  } = props;
  const wrapperCls = classNames(prefixCls, {
    [`${prefixCls}-${type}`]: type,
  });
  const onButtonClick = (e: React.MouseEvent) => {
    onClose && onClose();
    onClick && onClick(e);
  };

  return (
    <div {...restProps} ref={ref} className={wrapperCls}>
      <Icon icon={iconMap[type]} className={`${prefixCls}-icon`} />
      <div className={`${prefixCls}-message`}>{message}</div>
      {!!buttonText ? (
        <div className={`${prefixCls}-button`} onClick={onButtonClick}>
          <div className={`${prefixCls}-button-bg`}>{buttonText}</div>
          <span className={`${prefixCls}-button-placeholder`}>{buttonText}</span>
        </div>
      ) : (
        withClose && <Icon icon={'close'} className={`${prefixCls}-close`} onClick={onClose} />
      )}
      {withArrow && <div className={`${prefixCls}-arrow`} />}
    </div>
  );
});

ToastContainer.displayName = 'ToastContainer';
export default ToastContainer;

const ToastContainerMemo = React.memo(ToastContainer);
ToastContainerMemo.displayName = 'ToastContainerMemo';
export { ToastContainerMemo };
