import * as React from 'react';
import classNames from 'classnames';
import Icon from '@/components/icon';
import './style/tag.less';

export type ColorType =
  | 'blue-900'
  | 'green-900'
  | 'plain-blue-900'
  | 'orange-900'
  | 'blue-700'
  | 'green-700'
  | 'plain-blue-700'
  | 'orange-700'
  | 'red-900'
  | 'yellow-900'
  | 'magenta-900'
  | 'purple-900'
  | 'red-700'
  | 'yellow-700'
  | 'magenta-700'
  | 'purple-700'
  | 'grey-blue-500'
  | 'grey-blue-400';
export interface TextAlertProps {
  /** 类型 */
  type?: 'new';
  /** 大小 */
  size?: 'compact';
  /** 颜色 */
  color?: ColorType;
  /** 失效状态 */
  disabled?: boolean;
  /** 关闭功能 */
  closable?: boolean;
  /** 标签文案 */
  tag: string;
  /** 类名 */
  className?: string;
  /** tag 图标 */
  icon?: string;
  /** 点击tag回调 */
  onClickTag?: (e: React.MouseEvent, tag: string) => void;
  /** 点击关闭回调 */
  onClickClose?: (e: React.MouseEvent, tag: string) => void;
}

export const prefixCls = 'dmc-tag';

const Tag = React.forwardRef<HTMLDivElement, TextAlertProps>((props, ref) => {
  const {
    type,
    size,
    color,
    className,
    closable,
    disabled,
    tag,
    onClickClose,
    onClickTag,
    icon,
    ...restProps
  } = props;
  const cls = classNames(
    prefixCls,
    { [`${prefixCls}-${type}`]: type },
    { [`${prefixCls}-${size}`]: size },
    { [`${prefixCls}-color ${prefixCls}-color-${color}`]: color },
    { [`${prefixCls}-disabled`]: disabled },
    className,
  );
  const isAdd = type === 'new';
  const _onClickClose = (e: React.MouseEvent) => {
    onClickClose && onClickClose(e, tag);
  };
  const _onClickTag = (e: React.MouseEvent) => {
    onClickTag && onClickTag(e, tag);
  };
  return (
    <div {...restProps} ref={ref} className={cls} onClick={_onClickTag}>
      {(isAdd || !!icon) && (
        <Icon icon={icon || 'add'} className={isAdd ? `${prefixCls}-new-icon` : undefined} />
      )}
      <div className={`${prefixCls}-tag`}>{tag}</div>
      {!disabled && closable && (
        <Icon icon={'close'} className={`${prefixCls}-close`} onClick={_onClickClose} />
      )}
    </div>
  );
});

Tag.displayName = 'Tag';
export default Tag;

const TagMemo = React.memo(Tag);
TagMemo.displayName = 'TagMemo';
export { TagMemo };
