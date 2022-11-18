import * as React from 'react';
import RcDropdown from 'rc-dropdown';
import { DropdownProps as RcDropdownProps } from 'rc-dropdown/lib/Dropdown';
import './style/dropdown.less';

export interface DropdownProps extends Omit<RcDropdownProps, 'prefixCls'> {
  /** 关闭后是否销毁 Dropdown */
  destroyPopupOnHide?: boolean;
  /** 鼠标移入后的延迟显示时间 */
  mouseEnterDelay?: number;
  /** 鼠标离开后的延迟关闭时间 */
  mouseLeaveDelay?: number;
}

const prefixCls = 'dmc-dropdown';

export const Dropdown = React.forwardRef<unknown, DropdownProps>((props, ref) => {
  return <RcDropdown {...props} ref={ref} prefixCls={prefixCls} />;
});

Dropdown.defaultProps = {
  placement: 'bottomLeft',
  trigger: 'hover',
  destroyPopupOnHide: true,
  mouseEnterDelay: 0.15,
  mouseLeaveDelay: 0.1,
};

Dropdown.displayName = 'Dropdown';
export default Dropdown;

const DropdownMemo = React.memo(Dropdown);
DropdownMemo.displayName = 'DropdownMemo';
export { DropdownMemo };
