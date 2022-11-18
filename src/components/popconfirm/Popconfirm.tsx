import * as React from 'react';
import classNames from 'classnames';
import Button, { ButtonProps } from '../button';
import Popover, { PopoverProps } from '../popover';
import { NotificationContainer, NotificationContainerProps } from '../notification';
import './style/popconfirm.less';

export interface PopconfirmProps extends PopoverProps, Omit<NotificationContainerProps, 'footer'> {
  /** 失效状态 */
  disabled?: boolean;
  /** 确认回调 */
  onConfirm?: (e?: React.MouseEvent) => void;
  /** 取消回调 */
  onCancel?: (e?: React.MouseEvent) => void;
  /** 确认文案 */
  okText?: React.ReactNode;
  /** 取消文案 */
  cancelText?: React.ReactNode;
  /** 确认属性 */
  okButtonProps?: ButtonProps;
  /** 取消属性 */
  cancelButtonProps?: ButtonProps;
  /** 显示隐藏回调 */
  onVisibleChange?: (visible: boolean, e?: React.MouseEvent) => void;
  /** 底部模块 */
  footer?: (onCancel: (e: React.MouseEvent) => void) => React.ReactNode;
}

const prefixCls = 'dmc-popconfirm';
export const Popconfirm = React.forwardRef<unknown, PopconfirmProps>((props, ref) => {
  const [visible, setVisible] = React.useState(props.defaultVisible);

  React.useEffect(() => {
    if ('visible' in props) {
      setVisible(props.visible);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  const settingVisible = (value: boolean, e?: React.MouseEvent) => {
    if (!('visible' in props)) {
      setVisible(value);
    }
    props.onVisibleChange && props.onVisibleChange(value, e);
  };

  const onConfirm = (e: React.MouseEvent) => {
    settingVisible(false, e);
    props.onConfirm && props.onConfirm(e);
  };

  const onCancel = (e: React.MouseEvent) => {
    settingVisible(false, e);
    props.onCancel && props.onCancel(e);
  };

  const onVisibleChange = (value: boolean) => {
    if (props.disabled) {
      props.onConfirm && props.onConfirm();
      return;
    }
    settingVisible(value);
  };

  const {
    placement,
    className,
    content,
    footer,
    cancelText,
    cancelButtonProps,
    okText,
    okButtonProps,
    emotion,
    message,
    description,
    ...restProps
  } = props;

  const ft = footer ? (
    footer(onCancel)
  ) : (
    <div className={`${prefixCls}-buttons`}>
      <Button onClick={onCancel} size="compact" {...cancelButtonProps}>
        {cancelText}
      </Button>
      <Button type={'primary'} onClick={onConfirm} size="compact" {...okButtonProps}>
        {okText}
      </Button>
    </div>
  );

  const dc = content || (
    <NotificationContainer
      emotion={emotion}
      message={message}
      description={description}
      className={`${prefixCls}-container`}
      footer={ft}
    />
  );

  return (
    <Popover
      {...restProps}
      ref={ref}
      placement={placement}
      onVisibleChange={onVisibleChange}
      visible={visible}
      content={dc}
      className={classNames(`${prefixCls}`, className)}
    />
  );
});

Popconfirm.defaultProps = {
  trigger: 'click',
  disabled: false,
};
Popconfirm.displayName = 'Popconfirm';
export default Popconfirm;

const PopconfirmMemo = React.memo(Popconfirm);
PopconfirmMemo.displayName = 'PopconfirmMemo';
export { PopconfirmMemo };
