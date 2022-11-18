import * as React from 'react';
import classNames from 'classnames';
import Notification from 'rc-notification';
import { NotificationInstance as RCNotificationInstance } from 'rc-notification/lib/Notification';
import { ObjectInterface } from '../_utils/interfaces';
import { IconButton } from '../button';
import NotificationContainer from './NotificationContainer';
import './style/notification.less';

export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export type IconType = 'success' | 'info' | 'error' | 'warning';
export interface NotificationConfigProps {
  top?: number;
  bottom?: number;
  duration?: number;
  placement?: NotificationPlacement;
  getContainer?: () => HTMLElement;
  closeIcon?: React.ReactNode;
  rtl?: boolean;
}

const notificationInstance: {
  [key: string]: Promise<RCNotificationInstance>;
} = {};
let defaultDuration = 4.5;
let defaultTop = 24;
let defaultBottom = 24;
let defaultPlacement: NotificationPlacement = 'topRight';
let rtl = false;

const setNotificationConfig = (options: NotificationConfigProps) => {
  const { duration, placement, bottom, top } = options;
  if (duration !== undefined) {
    defaultDuration = duration;
  }
  if (placement !== undefined) {
    defaultPlacement = placement;
  }
  if (bottom !== undefined) {
    defaultBottom = bottom;
  }
  if (top !== undefined) {
    defaultTop = top;
  }
  if (options.rtl !== undefined) {
    rtl = options.rtl;
  }
};

const getPlacementStyle = (
  placement: NotificationPlacement,
  top: number = defaultTop,
  bottom: number = defaultBottom,
) => {
  let style;
  switch (placement) {
    case 'topLeft':
      style = { left: 0, top, bottom: 'auto' };
      break;
    case 'topRight':
      style = { right: 0, top, bottom: 'auto' };
      break;
    case 'bottomLeft':
      style = { left: 0, top: 'auto', bottom };
      break;
    default:
      style = { right: 0, top: 'auto', bottom };
      break;
  }
  return style;
};

const getNotificationInstance = (
  args: ArgsProps,
  callback: (info: { instance: RCNotificationInstance }) => void,
) => {
  const { top, bottom, placement = defaultPlacement } = args;
  const outerPrefixCls = 'dmc-notification';
  const cacheKey = `${outerPrefixCls}-${placement}`;
  const cacheInstance = notificationInstance[cacheKey];
  if (cacheInstance) {
    Promise.resolve(cacheInstance).then((instance) => {
      callback({ instance });
    });

    return;
  }

  const closeIconToRender = (
    <IconButton type={'only-icon'} icon={'close'} className={`${outerPrefixCls}-close-icon`} />
  );
  const notificationClass = classNames(`${outerPrefixCls}-${placement}`, {
    [`${outerPrefixCls}-rtl`]: rtl === true,
  });

  notificationInstance[cacheKey] = new Promise((resolve) => {
    Notification.newInstance(
      {
        prefixCls: outerPrefixCls,
        className: notificationClass,
        style: getPlacementStyle(placement, top, bottom),
        closeIcon: closeIconToRender,
      },
      (notification) => {
        resolve(notification);
        callback({ instance: notification });
      },
    );
  });
};

export interface ArgsProps {
  message: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  key?: string;
  onClose?: () => void;
  duration?: number | null;
  placement?: NotificationPlacement;
  style?: React.CSSProperties;
  className?: string;
  readonly type?: IconType;
  emotion?: string;
  onClick?: () => void;
  top?: number;
  bottom?: number;
  getContainer?: () => HTMLElement;
  closeIcon?: React.ReactNode;
}

const typeToIcon: { [key: string]: string } = {
  success: 'success',
  info: 'info',
  error: 'alert',
  warning: 'help-2',
};
const getRCNoticeProps = (args: ArgsProps) => {
  const duration = args.duration === undefined ? defaultDuration : args.duration;
  return {
    content: (
      <NotificationContainer
        message={args.message}
        description={args.description}
        footer={args.footer}
        emotion={typeToIcon[args.type as string] || args.emotion}
      />
    ),
    duration,
    closable: true,
    onClose: args.onClose,
    onClick: args.onClick,
    key: args.key,
    style: args.style || {},
    className: args.className,
  };
};

const api: ObjectInterface = {
  open: (args: ArgsProps) => {
    getNotificationInstance(args, ({ instance }) => {
      instance.notice(getRCNoticeProps(args));
    });
  },
  close(key: string) {
    Object.keys(notificationInstance).forEach((cacheKey) =>
      Promise.resolve(notificationInstance[cacheKey]).then((instance) => {
        instance.removeNotice(key);
      }),
    );
  },
  config: setNotificationConfig,
  destroy() {
    Object.keys(notificationInstance).forEach((cacheKey) => {
      Promise.resolve(notificationInstance[cacheKey]).then((instance) => {
        instance.destroy();
      });
      delete notificationInstance[cacheKey]; // lgtm[js/missing-await]
    });
    // 配置还原
    defaultDuration = 4.5;
    defaultTop = 24;
    defaultBottom = 24;
    defaultPlacement = 'topRight';
    rtl = false;
  },
};

['success', 'info', 'warning', 'error'].forEach((type) => {
  api[type] = (args: ArgsProps) => api.open({ ...args, type });
});

export interface NotificationInstance {
  success(args: ArgsProps): void;
  error(args: ArgsProps): void;
  info(args: ArgsProps): void;
  warning(args: ArgsProps): void;
  open(args: ArgsProps): void;
}

export interface NotificationApi extends NotificationInstance {
  close(key: string): void;
  config(options: NotificationConfigProps): void;
  destroy(): void;
}

export default api as NotificationApi;
