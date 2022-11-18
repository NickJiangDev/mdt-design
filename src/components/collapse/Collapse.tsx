import * as React from 'react';
import classNames from 'classnames';
import RcCollapse from 'rc-collapse';
import Icon from '@/components/icon';
import animation from '../_utils/openAnimation';

export interface ArrowIconProps {
  isActive?: boolean;
  disabled?: boolean;
}

const prefixCls = 'dmc-collapse';

export const defaultArrowIcon = ({ isActive, disabled }: ArrowIconProps) => {
  const arrowCls = classNames(`${prefixCls}-panel-arrow`, {
    [`${prefixCls}-panel-arrow-active`]: isActive,
    [`${prefixCls}-panel-arrow-disabled`]: disabled,
  });
  return <Icon className={arrowCls} icon="arrow-down" size={20} />;
};

export interface AnimationProps {
  enter: (node: HTMLElement, done: () => void) => { stop: () => void };
  leave: (node: HTMLElement, done: () => void) => { stop: () => void };
}

export interface CollapseProps {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 当前激活 tab 面板的 key */
  activeKey?: React.Key | React.Key[];
  /** 初始化选中面板的 key */
  defaultActiveKey?: React.Key | React.Key[];
  /** 销毁折叠隐藏的面板 */
  destroyInactivePanel?: boolean;
  /** 手风琴模式 */
  accordion?: boolean;
  /** 切换面板的回调 */
  onChange?: (key: React.Key | React.Key[]) => void;
  /** 自定义切换图标 */
  arrowIcon?: (prop: ArrowIconProps) => React.ReactNode;
  /** 打开动画 */
  openAnimation?: AnimationProps;
  /** 设置图标位置 */
  arrowPosition?: 'right';
}

const Collapse: React.FC<CollapseProps> = (props: CollapseProps) => {
  const { arrowIcon, className, arrowPosition, ...restProps } = props as CollapseProps &
    typeof defaultProps;
  const itemArrow = arrowIcon || defaultArrowIcon;
  const cls = classNames(className, {
    [`${prefixCls}-arrow-position-right`]: arrowPosition === 'right',
  });

  return <RcCollapse {...restProps} className={cls} expandIcon={itemArrow} prefixCls={prefixCls} />;
};

const defaultProps = {
  accordion: false,
  destroyInactivePanel: false,
  openAnimation: animation,
};

Collapse.defaultProps = defaultProps;

const CollapseMemo: React.FC<CollapseProps> = React.memo<CollapseProps>(Collapse);
CollapseMemo.displayName = 'CollapseMemo';

Collapse.displayName = 'Collapse';
export { CollapseMemo };
export default Collapse;
