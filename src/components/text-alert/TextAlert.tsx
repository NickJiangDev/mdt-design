import * as React from 'react';
import classNames from 'classnames';
import Icon from '@/components/icon';
import './style/text-alert.less';

export interface TextAlertProps {
  /** 类型 */
  type?: 'solid' | 'column';
  /** 大小 */
  size?: 'compact';
  /** 状态 */
  status?: 'warning' | 'error' | 'success';
  /** 无图标 */
  noIcon?: boolean;
  /** 文案 */
  message: string;
  /** 描述 */
  description?: string;
  /** 类名 */
  className?: string;
  /** 关闭点击回调 */
  onClickClose?: (e: React.MouseEvent) => void;
}

const prefixCls = 'dmc-text-alert';
const getIcon = (status: string) => {
  return status === 'success'
    ? 'success-outlined'
    : status === 'warning' || status === 'error'
    ? 'alert-outlined'
    : 'info-outlined';
};

const TextAlert = React.forwardRef<HTMLDivElement, TextAlertProps>((props, ref) => {
  const {
    type,
    size,
    status,
    noIcon,
    message,
    description,
    className,
    onClickClose,
    ...restProps
  } = props;
  const cls = classNames(
    prefixCls,
    { [`${prefixCls}-${type}`]: type },
    { [`${prefixCls}-${size}`]: size },
    { [`${prefixCls}-${status}-status`]: status },
    { [`${prefixCls}-has-desc`]: description },
    { [`${prefixCls}-no-icon`]: noIcon },
    className,
  );

  return (
    <div {...restProps} ref={ref} className={cls}>
      <div className={`${prefixCls}-message-container`}>
        {!noIcon && <Icon icon={getIcon(status as string)} className={`${prefixCls}-icon`} />}
        <div className={`${prefixCls}-message`}>{message}</div>
        {!!description && <div className={`${prefixCls}-desc`}>{description}</div>}
        <Icon icon={'close'} className={`${prefixCls}-close`} onClick={onClickClose} />
      </div>
    </div>
  );
});

TextAlert.displayName = 'TextAlert';
export default TextAlert;

const TextAlertMemo = React.memo(TextAlert);
TextAlertMemo.displayName = 'TextAlertMemo';
export { TextAlertMemo };
