import * as React from 'react';
import Tree, { TreeProps } from '@/components/tree';
import Scrollbar, { ScrollbarProps } from '@/components/scrollbar';
import './style/side-menu.less';

export interface SideMenuProps {
  treeProps: TreeProps;
  scrollbarProps?: ScrollbarProps;
  className?: string;
}

const prefixCls = 'dmc-side-menu';

const SideMenu: React.FC<SideMenuProps> = ({ treeProps, className, scrollbarProps }) => {
  return (
    <div className={`${prefixCls} ${className || ''}`}>
      <Scrollbar {...{ type: 'page-bg', ...(scrollbarProps || {}) }}>
        <Tree {...treeProps} />
      </Scrollbar>
    </div>
  );
};

SideMenu.displayName = 'SideMenu';
export default SideMenu;

const SideMenuMemo = React.memo(SideMenu);
SideMenuMemo.displayName = 'SideMenuMemo';
export { SideMenuMemo };
