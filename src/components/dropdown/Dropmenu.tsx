import * as React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import { IconButton } from '../button';
import { ObjectInterface } from '../_utils/interfaces';
import Menu, {
  MenuItem,
  MenuItemGroup,
  SubMenu,
  MenuDivider,
  MenuInfo,
  MenuClickEventHandler,
} from '../menu';
import Dropdown, { DropdownProps } from './Dropdown';
import './style/dropmenu.less';

export interface MenuItemProps extends ObjectInterface {
  type?: 'group' | 'subMenu';
  key: string;
  title: string;
  icon?: string;
  disabled?: boolean;
  children?: MenuItemProps[];
  divider?: boolean;
  danger?: boolean;
}
export interface DropmenuProps extends Omit<DropdownProps, 'children' | 'onVisibleChange'> {
  /** 菜单 */
  menus?: MenuItemProps[];
  /** 确认值 */
  values?: string[];
  /** 默认确认值 */
  defaultValues?: string[];
  /** 点击菜单列表回调 */
  onClickMenuItem?: MenuClickEventHandler;
  /** 点击菜单回调 */
  onClickMenu?: MenuClickEventHandler;
  /** 内容类名 */
  overlayClassName?: string;
  /** 气泡类名 */
  popupClassName?: string;
  /** 将宽度调整为其父宽度的选项 */
  block?: boolean;
  /** 图标展示 */
  icon?: string;
  /** 类名 */
  className?: string;
  /** 图标类型 */
  iconType?: 'border' | 'only-icon';
  /** 菜单类型 */
  type?: 'menu-bg' | 'assist-bg';
  /** 尺寸 */
  size?: 'compact';
  /** 只显示文字 */
  onlyText?: boolean;
  /** 禁用状态 */
  disabled?: boolean;
  /** 不显示icon, 设置false */
  dropIcon?: string | boolean;
  /** 自定义菜单的渲染 */
  renderDropNode?: (actived: boolean) => React.ReactElement;
  /** 自定义内容渲染 */
  renderOverlay?: () => React.ReactElement;
  /** 显示隐藏回调 */
  onVisibleChange?: (visible: boolean, dropKey?: string) => void;
  /** 用来标记key */
  dropKey?: string;
  /** 菜单边框隐藏 */
  dropNoBorder?: boolean;
  /** 不需要菜单记录select */
  noSelected?: boolean;
}
const prefixCls = 'dmc-dropmenu';

const Dropmenu: React.FC<DropmenuProps> = (props) => {
  const {
    type,
    size,
    menus = [],
    values,
    defaultValues,
    onClickMenuItem,
    onClickMenu,
    icon,
    iconType,
    children,
    block,
    className,
    onlyText,
    dropIcon,
    renderOverlay,
    renderDropNode,
    overlayClassName,
    popupClassName,
    dropKey,
    dropNoBorder,
    noSelected,
    disabled,
    trigger,
    ...restProps
  } = props;

  // 非受控
  const [unControlVal, setUnControlVal] = React.useState(defaultValues ?? []);
  // 受控校验
  const isControl = 'values' in props;
  // 受控/非受控的value
  const bindValue = isControl ? values ?? [] : unControlVal;

  // 不记录选择
  const val = !noSelected ? bindValue : [];

  const [actived, setActived] = React.useState(!!props.visible);
  const cls = classNames(
    `${prefixCls}`,
    {
      [`${prefixCls}-compact`]: size === 'compact',
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-no-border`]: dropNoBorder,
      [`${prefixCls}-actived`]: actived,
      [`${prefixCls}-only-icon`]: icon,
      [`${prefixCls}-only-text`]: onlyText,
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-disabled`]: disabled,
    },
    className,
  );

  const handleClickMenuItem = (params: MenuInfo) => {
    setActived(false);
    !isControl && setUnControlVal(params.keyPath as string[]);
    onClickMenuItem && onClickMenuItem(params);
  };

  const renderMenuChildren = (item: MenuItemProps, index?: number, arr?: MenuItemProps[]) => {
    let node;
    if (item.children) {
      const View = item.type === 'group' ? MenuItemGroup : SubMenu;
      const itemCls = item.type === 'group' ? '' : `${prefixCls}-sub-menu-item`;
      const cls = item.type === 'group' ? '' : popupClassName || overlayClassName || '';
      node = (
        <View
          className={itemCls}
          popupClassName={cls}
          key={item.key}
          title={<span>{item.title}</span>}
          disabled={item.disabled}
        >
          {item.children.map((it, index) => renderMenuChildren(it, index, item.children))}
        </View>
      );
    } else {
      const select = classNames(`${prefixCls}-menu-item`, {
        [`${prefixCls}-menu-item-actived`]: val.includes(item.key),
      });
      node = (
        <MenuItem
          key={item.key}
          onClick={handleClickMenuItem}
          disabled={item.disabled}
          selectable={false}
          danger={item.danger}
        >
          <div className={select}>
            <Icon icon={'done-check'} className={`${prefixCls}-drop-icon`} />
            {item.icon && <Icon icon={item.icon} className={`${prefixCls}-icon`} />}
            {item.title}
          </div>
        </MenuItem>
      );
    }
    // 去掉最后一个item添加的divider
    const currentLength = (arr ?? []).length;
    const noDivider = currentLength - 1 === index;
    if (item.divider && !noDivider) {
      return [node, <MenuDivider key={`${item.key}-divider`} />];
    }
    return node;
  };

  const overlay = renderOverlay
    ? renderOverlay()
    : () => {
        const menuType = type === 'assist-bg' ? 'assist-bg' : undefined;
        const overlayCls = classNames(overlayClassName);
        return (
          <Menu type={menuType} onClick={onClickMenu} className={overlayCls}>
            {menus.map((it, index) => renderMenuChildren(it, index, menus))}
          </Menu>
        );
      };

  const onVisibleChange = (visible: boolean) => {
    props.onVisibleChange && props.onVisibleChange(visible, dropKey);
    !disabled && setActived(visible);
  };

  let dropNode;
  if (icon) {
    if (iconType === 'border') {
      dropNode = (
        <IconButton type={'border'} actived={actived} className={className} disabled={disabled}>
          <Icon icon={icon} size={18} />
          <Icon icon="arrow-down" size={12} />
        </IconButton>
      );
    } else if (iconType === 'only-icon') {
      dropNode = (
        <IconButton
          type={'only-icon'}
          icon={icon}
          actived={actived}
          ghost
          className={className}
          disabled={disabled}
        />
      );
    } else {
      dropNode = (
        <IconButton icon={icon} actived={actived} ghost className={className} disabled={disabled} />
      );
    }
  } else if (onlyText) {
    dropNode = (
      <div className={cls}>
        {children}
        {dropIcon !== false && (
          <Icon icon={(dropIcon || 'chevron-down') as string} className={`${prefixCls}-icon`} />
        )}
      </div>
    );
  } else if (renderDropNode) {
    dropNode = renderDropNode(actived);
  } else {
    dropNode = (
      <div className={cls}>
        {children}
        {dropIcon !== false && (
          <Icon icon={(dropIcon || 'arrow-down') as string} className={`${prefixCls}-icon`} />
        )}
      </div>
    );
  }

  return (
    <Dropdown
      overlay={overlay}
      {...restProps}
      onVisibleChange={onVisibleChange}
      trigger={disabled ? [] : trigger}
    >
      {dropNode}
    </Dropdown>
  );
};

Dropmenu.defaultProps = {
  placement: 'bottomLeft',
  trigger: 'click',
};

Dropmenu.displayName = 'Dropmenu';
export default Dropmenu;

const DropmenuMemo = React.memo(Dropmenu);
DropmenuMemo.displayName = 'DropmenuMemo';
export { DropmenuMemo };
