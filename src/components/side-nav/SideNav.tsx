import * as React from 'react';
import classNames from 'classnames';
import './style/side-nav.less';

export interface SideNavProps {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 幽灵样式 */
  ghost?: boolean;
  /** 类型 */
  type?: 'assist-bg' | 'page-bg';
}

const prefixCls = 'dmc-side-nav';

const SideNav: React.FC<SideNavProps> = (props) => {
  const { className, style, children, ghost, type } = props;
  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-ghost`]: ghost,
      [`${prefixCls}-${type}`]: type,
    },
    className,
  );

  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
};

SideNav.displayName = 'SideNav';
export default SideNav;

const SideNavMemo = React.memo(SideNav);
SideNavMemo.displayName = 'SideNavMemo';
export { SideNavMemo };
