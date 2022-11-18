import * as React from 'react';
import classNames from 'classnames';
import RcMenu, {
  SubMenu as RcSubMenu,
  MenuItemGroup,
  MenuItem as RcMenuItem,
  Divider as MenuDivider,
} from 'rc-menu';
import { MenuProps as RcMenuProps } from 'rc-menu/lib/Menu';
import { SubMenuProps as RcSubMenuProps } from 'rc-menu/lib/SubMenu';
import { MenuItemProps as RcMenuItemProps } from 'rc-menu/lib/MenuItem';
import './style/menu.less';

export interface MenuProps
  extends Omit<RcMenuProps, 'prefixCls' | 'openTransitionName' | 'openAnimation'> {
  /** 类型 */
  type?: 'assist-bg';
}

export interface SubMenuProps extends RcSubMenuProps {
  /** 类型 */
  type?: 'assist-bg';
  /** 样式 */
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface MenuItemProps extends RcMenuItemProps {
  /** 设置状态 */
  danger?: boolean;
  selectable?: boolean;
}

const prefixCls = 'dmc-menu';

export const Menu: React.FC<MenuProps> = (props) => {
  const { type, className, ...restProps } = props;
  const cls = classNames({ [`${prefixCls}-${type}`]: type }, className);
  return <RcMenu {...restProps} className={cls} prefixCls={prefixCls} />;
};

Menu.displayName = 'Menu';
export default Menu;

export const SubMenu: React.FC<SubMenuProps> = (props) => {
  const cls = classNames({ [`${prefixCls}-${props.type}`]: props.type }, props.className);
  const popCls = classNames(
    { [`${prefixCls}-popup-${props.type}`]: props.type },
    props.popupClassName,
  );
  return <RcSubMenu {...props} className={cls} popupClassName={popCls} />;
};

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { danger, className, ...restProps } = props;
  const cls = classNames(className, { [`${prefixCls}-item-danger`]: danger });
  return <RcMenuItem {...restProps} className={cls} />;
};

SubMenu.displayName = 'SubMenu';
const SubMenuMemo = React.memo(SubMenu);
SubMenuMemo.displayName = 'SubMenuMemo';

const MenuMemo = React.memo(Menu);
MenuMemo.displayName = 'MenuMemo';
export { MenuItemGroup, MenuDivider, MenuMemo, SubMenuMemo };
