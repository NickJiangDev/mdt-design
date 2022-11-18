import Notification from 'rc-notification';
import { NotificationInstance } from 'rc-notification/lib/Notification';
import ToastContainer, { ToastContainerProps } from './ToastContainer';
import './style/toast.less';

export type ToastOpts = Omit<ToastContainerProps, 'type'>;
export type ToastMethod = (
  message: string | ToastOpts,
) => {
  id: string;
};

export type ToastInterface = {
  notification: NotificationInstance;
  success: ToastMethod;
  warning: ToastMethod;
  info: ToastMethod;
  error: ToastMethod;
};

const maxCount = 6;
const duration = 3;
let notification: NotificationInstance;
Notification.newInstance({ prefixCls: 'dmc-toast', maxCount }, (n) => {
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
    const id = `toast-${++i}`;
    const onClose = () => notification.removeNotice(id);
    notification.notice({
      content: <ToastContainer type={key} {...props} onClose={onClose} />,
      key: id,
      closeIcon: false,
      duration,
      closable: false,
    });
    return { id };
  };
});

export default toastApi;
