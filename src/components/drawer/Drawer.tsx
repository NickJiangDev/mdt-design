import * as React from 'react';
import RcDrawer from 'rc-drawer';
import { IPlacement } from 'rc-drawer/lib/IDrawerPropTypes';
import './style/drawer.less';

export declare type ILevelMove = number | [number, number];
export declare type IStringOrHtmlElement = string | HTMLElement;
export interface DrawerProps {
  /** 宽度 */
  width?: string | number;
  /** 高度, 在 placement 为 top 或 bottom 时使用 */
  height?: string | number;
  /** Drawer 是否可见 */
  open?: boolean;
  /** 默认 Drawer 是否可见 */
  defaultOpen?: boolean;
  /** true or false or ReactElement, default: <divclassName="drawer-handle"><i className="drawer-handle-icon" /></div>; */
  handler?: React.ReactElement | null | false;
  /** 抽屉的方向 */
  placement?: IPlacement;
  /** With the drawer level element */
  level?: null | string | string[];
  /** 水平移动值。默认是抽屉宽度 */
  levelMove?: ILevelMove | ((e: { target: HTMLElement; open: boolean }) => ILevelMove);
  /** 水平动画时间 */
  duration?: string;
  /** 水平动画计时功能 */
  ease?: string;
  /** 是否展示遮罩 */
  showMask?: boolean;
  /** 点击蒙层是否允许关闭 */
  maskClosable?: boolean;
  /** 遮罩样式 */
  maskStyle?: React.CSSProperties;
  /** 变化回调 */
  onChange?: (open?: boolean) => void;
  /** 显示隐藏的回调 */
  afterVisibleChange?: (open: boolean) => void;
  /** handler icon 点击回调 */
  onHandleClick?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  /** 点击遮罩层或左上角叉或取消按钮的回调 */
  onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  /** 是否支持键盘 esc 关闭 */
  keyboard?: boolean;
  /** 可用于设置 Drawer 包裹内容部分的类名 */
  wrapperClassName?: string;
  /** 类名 */
  className?: string;
  /** 预渲染 Drawer 内元素 */
  forceRender?: boolean;
  /** 指定 Drawer 挂载的 HTML 节点, false 为挂载在当前 dom */
  getContainer?: string | HTMLElement | (() => HTMLElement);
  children?: React.ReactNode;
}

export const prefixCls = 'dmc-drawer';
export const Drawer = React.forwardRef<unknown, DrawerProps>((props: DrawerProps, ref) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <RcDrawer {...props} ref={ref as any} prefixCls={prefixCls} />;
});

Drawer.defaultProps = {
  placement: 'right',
  handler: false,
};

Drawer.displayName = 'Drawer';
export default Drawer;

const DrawerMemo = React.memo(Drawer);
DrawerMemo.displayName = 'DrawerMemo';
