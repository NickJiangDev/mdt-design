import * as React from 'react';
import classNames from 'classnames';
import Icon from '../icon';

export interface SideNavItemProps {
  /** 类型 */
  type?: 'mark';
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 图标 */
  icon?: string;
  /** 单元文案 */
  label?: string;
  /** 激活状态 */
  actived?: boolean;
  /** data-value */
  value?: string;
  /** 失效状态 */
  disabled?: boolean;
  /** 点击回调 */
  onClick?: (e: React.MouseEvent) => void;
}

const prefixCls = 'dmc-side-nav-item';

const SideNavItem: React.FC<SideNavItemProps> = ({
  className,
  style,
  children,
  type,
  icon,
  label,
  value,
  actived,
  onClick,
  disabled,
  ...restProps
}) => {
  const cls = classNames(
    prefixCls,
    { [`${prefixCls}-${type}`]: type },
    { [`${prefixCls}-actived`]: actived },
    { [`${prefixCls}-disabled`]: disabled },
    className,
  );
  const node = children || (
    <React.Fragment>
      {!!icon && <Icon icon={icon} className={`${prefixCls}-icon`} />}
      <div className={`${prefixCls}-label`}>{label}</div>
    </React.Fragment>
  );

  return (
    <div
      {...restProps}
      data-value={value}
      className={cls}
      style={style}
      onClick={disabled ? undefined : onClick}
    >
      {node}
    </div>
  );
};

SideNavItem.displayName = 'SideNavItem';
export default SideNavItem;

const SideNavItemMemo = React.memo(SideNavItem);
SideNavItemMemo.displayName = 'SideNavItemMemo';
export { SideNavItemMemo };
