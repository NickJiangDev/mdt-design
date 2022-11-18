import * as React from 'react';
import classNames from 'classnames';
import { Panel as RcPanel } from 'rc-collapse';
import animation from '../_utils/openAnimation';
import { ArrowIconProps, defaultArrowIcon, AnimationProps } from './Collapse';

const prefixCls = 'dmc-collapse-panel';

export interface CollapseItemProps {
  /** 对应 activeKey */
  key?: string;
  /** 类名 */
  className?: string;
  /** 面板头内容 */
  header?: React.ReactNode;
  /** 面板头类名 */
  headerClass?: string;
  /** 自定义渲染每个面板右上角的内容 */
  extra?: React.ReactNode;
  /** 失效状态 */
  disabled?: boolean;
  /** 激活状态 */
  isActive?: boolean;
  /** 是否展示当前面板上的箭头 */
  showArrow?: boolean;
  /** 自定义切换图标 */
  arrowIcon?: (prop: ArrowIconProps) => React.ReactNode;
  /** 设置图标位置 */
  arrowPosition?: 'right';
  /** 面板点击回调 */
  onItemClick?: (key: string | number) => void;
  /** 销毁折叠隐藏的面板 */
  destroyInactivePanel?: boolean;
  /** 被隐藏时是否渲染 DOM 结构 */
  forceRender?: boolean;
  /** 手风琴模式 */
  accordion?: boolean;
  /** 打开动画 */
  openAnimation?: AnimationProps;
  children?: React.ReactNode;
}

const CollapseItem: React.FC<CollapseItemProps> = (props: CollapseItemProps) => {
  const {
    arrowIcon,
    header,
    className,
    arrowPosition,
    disabled,
    ...restProps
  } = props as CollapseItemProps & typeof defaultProps;
  const itemArrow = arrowIcon || defaultArrowIcon;
  const cls = classNames(className, {
    [`${prefixCls}-arrow-position-right`]: arrowPosition === 'right',
    [`${prefixCls}-item-disabled`]: disabled,
  });

  const newHeader = <div className={`${prefixCls}-header-content`}>{header}</div>;

  return (
    <RcPanel
      {...restProps}
      className={cls}
      prefixCls={prefixCls}
      header={newHeader}
      expandIcon={itemArrow}
      collapsible={disabled ? 'disabled' : undefined}
    />
  );
};

const defaultProps = {
  showArrow: true,
  isActive: false,
  destroyInactivePanel: false,
  forceRender: false,
  openAnimation: animation,
};

CollapseItem.defaultProps = defaultProps;

const CollapseItemMemo = React.memo<CollapseItemProps>(CollapseItem);
CollapseItemMemo.displayName = 'CollapseItemMemo';

CollapseItem.displayName = 'CollapseItem';
export { CollapseItemMemo };
export default CollapseItem;
