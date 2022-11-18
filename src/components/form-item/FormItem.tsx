import * as React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import './style/form-item.less';

export interface FormItemProps {
  /** 标签的文本 */
  label: React.ReactNode;
  /** 必填样式设置 */
  required?: React.ReactNode;
  /** 文本位置 */
  position?: 'right';
  /** 消息文本 */
  message?: React.ReactNode;
  /** 控制label和value的显示方式 */
  direction?: 'column';
  /** 额外的提示信息 */
  extraNode?: React.ReactNode;
  /** 状态 */
  status?: 'warning' | 'error' | 'success';
  /** 消息图标 */
  messageIcon?: React.ReactNode;
  /** 将按钮宽度调整为其父宽度的选项 */
  block?: boolean;
  children?: React.ReactNode;
}

const prefixCls = 'dmc-form-item';

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  (
    {
      messageIcon,
      label,
      children,
      position,
      required,
      message,
      direction,
      extraNode,
      status,
      block,
      ...restProps
    },
    ref,
  ) => {
    const requiredNode =
      required === true ? <div className={`${prefixCls}-required`}>*</div> : required;

    const iconNode =
      typeof messageIcon === 'string' ? (
        <Icon icon={messageIcon as string} className={`${prefixCls}-icon`} />
      ) : (
        messageIcon
      );

    const itemCls = classNames(prefixCls, {
      [`${prefixCls}-${direction}`]: direction,
      [`${prefixCls}-${status}`]: status,
      [`${prefixCls}-block`]: block,
    });

    const labelCls = classNames(`${prefixCls}-label`, {
      [`${prefixCls}-label-${position}`]: position,
    });

    const messageCls = classNames(`${prefixCls}-message`, {
      [`${prefixCls}-message-${status}`]: status,
    });

    return (
      <div {...restProps} className={itemCls} ref={ref}>
        <div className={labelCls}>
          {requiredNode}
          <span className={`${prefixCls}-label-context`}>{label}</span>
        </div>
        <div className={`${prefixCls}-message-wrapper`}>
          {children}
          {!!message && (
            <div className={messageCls}>
              {iconNode}
              <span>{message}</span>
            </div>
          )}
          {extraNode}
        </div>
      </div>
    );
  },
);

FormItem.displayName = 'FormItem';
export default FormItem;

const FormItemMemo = React.memo(FormItem);
FormItemMemo.displayName = 'FormItemMemo';
export { FormItemMemo };
