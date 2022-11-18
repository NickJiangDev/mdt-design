import * as React from 'react';
import classNames from 'classnames';
import SplitPanel from '../split-panel';
import Drawer, { DrawerProps, prefixCls } from './Drawer';

export interface DragDrawerProps extends DrawerProps {
  /** 最小 */
  minSize?: number;
  /** 最大 */
  maxSize?: number;
  /** 默认 */
  defaultSize?: string | number;
  children?: React.ReactNode;
}

export const DragDrawer = React.forwardRef<unknown, DragDrawerProps>((props, ref) => {
  const { children, minSize, maxSize, defaultSize, className, placement, ...restProps } = props;
  const isHorizontal = placement === 'bottom' || placement === 'top';
  const cls = classNames(`${prefixCls}-drag`, className);
  const split = isHorizontal ? 'horizontal' : 'vertical';
  return (
    <Drawer
      {...restProps}
      placement={placement}
      ref={ref}
      className={cls}
      width={'100vw'}
      height={'100vh'}
    >
      <SplitPanel
        split={split}
        minSize={minSize}
        maxSize={maxSize}
        defaultSize={defaultSize}
        primary={'second'}
      >
        <div />
        <div style={{ width: '100%', height: '100%' }}>{children}</div>
      </SplitPanel>
    </Drawer>
  );
});

DragDrawer.defaultProps = {
  defaultSize: '80%',
  minSize: 150,
};
DragDrawer.displayName = 'DragDrawer';

export default DragDrawer;

const DragDrawerMemo = React.memo(DragDrawer);
DragDrawerMemo.displayName = 'DragDrawerMemo';
