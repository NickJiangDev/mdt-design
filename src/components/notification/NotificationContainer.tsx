import * as React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import './style/notification-container.less';

export interface NotificationContainerProps {
  /** 图标 */
  emotion?: string;
  /** 消息标题 */
  message: React.ReactNode;
  /** 描述 */
  description?: React.ReactNode;
  /** 底部 */
  footer?: React.ReactNode;
  /** 类名 */
  className?: string;
}

const prefixCls = 'dmc-notification-container';

const NotificationContainer: React.FC<NotificationContainerProps> = (props) => {
  const { message, description, emotion, className, footer, ...restProps } = props;
  const wrapperCls = classNames(
    prefixCls,
    {
      [`${prefixCls}-no-icon`]: !emotion,
    },
    className,
  );

  return (
    <div {...restProps} className={wrapperCls}>
      {!!emotion && <Icon icon={emotion} className={`${prefixCls}-icon ${prefixCls}-${emotion}`} />}
      <div className={`${prefixCls}-message`}>{message}</div>
      <div className={`${prefixCls}-desc`}>{description}</div>
      {footer ? <span className={`${prefixCls}-footer`}>{footer}</span> : null}
    </div>
  );
};

NotificationContainer.displayName = 'NotificationContainer';
export default NotificationContainer;

const NotificationContainerMemo = React.memo(NotificationContainer);
NotificationContainerMemo.displayName = 'NotificationContainerMemo';
export { NotificationContainerMemo };
