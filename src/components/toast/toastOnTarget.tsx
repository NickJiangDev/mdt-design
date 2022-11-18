import Notification from 'rc-notification';
import { NotificationInstance } from 'rc-notification/lib/Notification';
import ToastContainer, { ToastContainerProps } from './ToastContainer';
import './style/toastOnTarget.less';

export type ToastOnTargetOpts = Omit<ToastContainerProps, 'type'> & { duration?: number };
export type ToastOnTargetMethod = (
  message: string | ToastOnTargetOpts,
) => {
  id: number;
};

export type ToastOnTargetInterface = {
  notification: NotificationInstance;
  success: ToastOnTargetMethod;
  warning: ToastOnTargetMethod;
  info: ToastOnTargetMethod;
  error: ToastOnTargetMethod;
};

const maxCount = 1;
const defaultDuration = 1.5;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const toastOnTarget: (
  getContainer?: () => HTMLElement,
  prefix?: string,
) => ToastOnTargetInterface = (getContainer, prefix = 'target') => {
  let notification: NotificationInstance;
  Notification.newInstance({ prefixCls: 'dmc-toast-on-target', maxCount, getContainer }, (n) => {
    notification = n;
  });
  let i = 0;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const toastApi: ToastInterface = { notification };
  ['success', 'warning', 'info', 'error'].forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    toastApi[key] = (message) => {
      const props = typeof message === 'string' ? { message } : message;
      const { duration, ...others } = props;
      const id = `toast-${prefix}-${++i}`;
      const onClose = () => notification.removeNotice(id);
      notification.notice({
        content: <ToastContainer type={key} {...others} onClose={onClose} />,
        key: id,
        closeIcon: false,
        duration: duration !== undefined ? duration : defaultDuration,
        closable: false,
      });
      return { id };
    };
  });
  return toastApi;
};

export default toastOnTarget;
