import React, { FC } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import Dialog, { DialogProps } from './Dialog';
import './style/emotion.less';

export interface EmotionProps
  extends Omit<DialogProps, 'title' | 'centered' | 'maskClosable' | 'closable'> {
  /** 图标名称 */
  emotion?: string;
  /** 标题名称 */
  title?: string;
  /** 描述内容 */
  description?: React.ReactNode;
  /** 额外内容 */
  extra?: React.ReactNode;
}

const prefixCls = 'dmc-dialog-emotion';

const Emotion: FC<EmotionProps> = (props) => {
  const { emotion, className, title, description, extra, ...restProps } = props;
  const cls = classNames(prefixCls, { [`${prefixCls}-no-icon`]: !emotion }, className);
  return (
    <Dialog
      {...restProps}
      centered
      title={false}
      className={cls}
      maskClosable={false}
      closable={false}
    >
      {!!emotion && <Icon icon={emotion} className={`${prefixCls}-icon ${prefixCls}-${emotion}`} />}
      <div className={`${prefixCls}-title`}>{title}</div>
      {!!description && <div className={`${prefixCls}-desc`}>{description}</div>}
      {!!extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
    </Dialog>
  );
};

Emotion.displayName = 'Emotion';
export default Emotion;

const EmotionMemo = React.memo(Emotion);
EmotionMemo.displayName = 'EmotionMemo';
export { EmotionMemo };
