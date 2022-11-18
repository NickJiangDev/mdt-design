import * as React from 'react';
import classNames from 'classnames';
import Tag, { prefixCls } from './Tag';

export interface SwitchTagProps {
  /** 标签文案 */
  tag: string;
  /** 类名 */
  className?: string;
  /** 激活状态 */
  actieved?: boolean;
  /** 失效状态 */
  disabled?: boolean;
  /** 点击标签回调 */
  onClickTag?: (e: React.MouseEvent) => void;
}

const SwitchTag: React.FC<SwitchTagProps> = (props) => {
  const { actieved, className, disabled, ...restProps } = props;
  const cls = classNames({ [`${prefixCls}-actieved`]: actieved }, className);

  return <Tag className={cls} {...restProps} disabled={disabled} />;
};

SwitchTag.displayName = 'SwitchTag';
export default SwitchTag;

const SwitchTagMemo = React.memo(SwitchTag);
SwitchTagMemo.displayName = 'SwitchTagMemo';
export { SwitchTagMemo };
