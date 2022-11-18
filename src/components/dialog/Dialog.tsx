import * as React from 'react';
import classNames from 'classnames';
import RCDialog from 'rc-dialog';
import Icon from '@/components/icon';
import { IDialogPropTypes } from 'rc-dialog/lib/IDialogPropTypes';
import Button, { ButtonProps } from '@/components/button';
import './style/dialog.less';

export interface DialogProps extends Omit<IDialogPropTypes, 'prefixCls' | 'onClose' | 'footer'> {
  /** 垂直居中展示 */
  centered?: boolean;
  /** 确认按钮文字 */
  okText?: React.ReactNode;
  /** 取消按钮文字 */
  cancelText?: React.ReactNode;
  /** 点击确定回调 */
  onOk?: (e: React.SyntheticEvent, value?: string, setLoading?: (loading: boolean) => void) => void;
  /** 点击遮罩层或右上角叉或取消按钮的回调 */
  onCancel?: (e: React.SyntheticEvent, onClose?: (e?: React.SyntheticEvent) => void) => void;
  /** ok 按钮 props */
  okButtonProps?: ButtonProps;
  /** cancel 按钮 props */
  cancelButtonProps?: ButtonProps;
  /** 底部内容，当不需要默认底部按钮时，可以设为 footer={null} */
  footer?: (onCancel?: (e: React.SyntheticEvent, onClose?: () => void) => void) => React.ReactNode;
}

const prefixCls = 'dmc-dialog';

const Dialog: React.FC<DialogProps> = (props) => {
  const {
    children,
    title,
    wrapClassName,
    centered,
    okText,
    cancelText,
    onOk,
    onCancel,
    okButtonProps,
    cancelButtonProps,
    footer,
    ...dialogProps
  } = props as DialogProps & typeof defaultProps;
  const wrapClassNameExtended = classNames(
    {
      [`${prefixCls}-centered`]: centered,
    },
    wrapClassName,
  );

  const hackClose = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.stopPropagation();
      e.preventDefault();
      onCancel && onCancel(e);
    },
    [onCancel],
  );

  const [loading, setLoading] = React.useState(false);
  const _onOk = React.useCallback(
    (e) => {
      onOk && onOk(e, '', setLoading);
    },
    [onOk],
  );

  const ft = footer ? (
    footer(onCancel)
  ) : (
    <div className={`${prefixCls}-default-actions`}>
      {!!cancelText && (
        <Button {...(cancelButtonProps || {})} onClick={onCancel}>
          {cancelText}
        </Button>
      )}
      {!!okText && (
        <Button type={'primary'} loading={loading} {...(okButtonProps || {})} onClick={_onOk}>
          {okText}
        </Button>
      )}
    </div>
  );
  // const Close = (e: React.SyntheticEvent) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   props.onCancel && props.onCancel(e);
  // };

  return (
    <RCDialog
      {...dialogProps}
      title={title}
      prefixCls={prefixCls}
      closeIcon={<Icon icon="close" onClick={hackClose} />}
      onClose={hackClose}
      wrapClassName={wrapClassNameExtended}
      footer={ft}
    >
      {children}
    </RCDialog>
  );
};

const defaultProps = {
  destroyOnClose: true,
};

Dialog.defaultProps = defaultProps;

Dialog.displayName = 'Dialog';
export default Dialog;

const DialogMemo = React.memo(Dialog);
DialogMemo.displayName = 'DialogMemo';
export { DialogMemo };
