import * as React from 'react';
import RcTooltip from 'rc-tooltip';
import classNames from 'classnames';
import { BuildInPlacements } from 'rc-trigger/lib/interface';
import { TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip';
import { ObjectInterface } from '../_utils/interfaces';
import { cloneElement, isValidElement } from '../_utils/reactNode';
import getPlacements, { AdjustOverflow } from './placements';
import './style/tooltip.less';

export type TooltipPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

export interface TooltipAlignConfig {
  points?: [string, string];
  offset?: [number | string, number | string];
  targetOffset?: [number | string, number | string];
  overflow?: { adjustX: boolean; adjustY: boolean };
  useCssRight?: boolean;
  useCssBottom?: boolean;
  useCssTransform?: boolean;
}

export interface AbstractTooltipProps extends Partial<RcTooltipProps> {
  /** 样式 */
  style?: React.CSSProperties;
  /** 类名 */
  className?: string;
  /** 气泡框位置 */
  placement?: TooltipPlacement;
  /** 描述popup的菜单如何被定位) */
  builtinPlacements?: BuildInPlacements;
  /** 打开的类名 */
  openClassName?: string;
  /** 箭头是否指向目标元素中心 */
  arrowPointAtCenter?: boolean;
  /** 气泡被遮挡时自动调整位置 */
  autoAdjustOverflow?: boolean | AdjustOverflow;
  /** 	浮层渲染父节点，默认渲染到 body 上 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

export type RenderFunction = () => React.ReactNode;

export interface TooltipPropsWithOverlay extends AbstractTooltipProps {
  /** 提示文字 */
  title?: React.ReactNode | RenderFunction;
  /** 内容替换 */
  overlay: React.ReactNode | RenderFunction;
}

export interface TooltipPropsWithTitle extends AbstractTooltipProps {
  /** 提示文字 */
  title: React.ReactNode | RenderFunction;
  /** 内容替换 */
  overlay?: React.ReactNode | RenderFunction;
}

export declare type TooltipProps = TooltipPropsWithTitle | TooltipPropsWithOverlay;

const splitObject = (obj: ObjectInterface, keys: string[]) => {
  const picked: ObjectInterface = {};
  const omitted: ObjectInterface = { ...obj };
  keys.forEach((key) => {
    if (obj && key in obj) {
      picked[key] = obj[key];
      delete omitted[key];
    }
  });
  return { picked, omitted };
};

const layoutAttr = ['position', 'left', 'right', 'top', 'bottom', 'float', 'display', 'zIndex'];
const ignoreChildren = ['Handle'];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDisabledCompatibleChildren = (element: React.ReactElement<any>, prefixCls: string) => {
  const type = typeof element.type === 'string' ? element.type : element.type.name;
  if (element.props.disabled && !ignoreChildren.includes(type)) {
    const { picked, omitted } = splitObject(element.props.style, layoutAttr);
    const spanStyle = {
      display: 'inline-block', // default inline-block is important
      ...picked,
      cursor: 'not-allowed',
      width: element.props.block ? '100%' : undefined,
    };
    const buttonStyle = { ...omitted, pointerEvents: 'none' };
    const child = cloneElement(element, { style: buttonStyle });
    return (
      <span style={spanStyle} className={`${prefixCls}-disabled-compatible-wrapper`}>
        {child}
      </span>
    );
  }
  return element;
};

const DEFAULT_PREFIXCLS = 'dmc-tooltip';

export const Tooltip = React.forwardRef<unknown, TooltipProps>((props, ref) => {
  const [visible, setVisible] = React.useState(!!props.visible || !!props.defaultVisible);

  React.useEffect(() => {
    if ('visible' in props) {
      setVisible(!!props.visible);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  const isNoTitle = () => {
    const { title, overlay } = props;
    return !title && !overlay && title !== 0; // overlay for old version compatibility
  };

  const onVisibleChange = (vis: boolean) => {
    if (!('visible' in props)) {
      setVisible(isNoTitle() ? false : vis);
    }
    if (props.onVisibleChange && !isNoTitle()) {
      props.onVisibleChange(vis);
    }
  };

  const getTooltipPlacements = () => {
    const { builtinPlacements, arrowPointAtCenter, autoAdjustOverflow } = props;
    return builtinPlacements || getPlacements({ arrowPointAtCenter, autoAdjustOverflow });
  };

  // 动态设置动画点
  const onPopupAlign = (domNode: HTMLElement, align: ObjectInterface) => {
    const placements: ObjectInterface = getTooltipPlacements();
    // 当前返回的位置
    const placement = Object.keys(placements).filter(
      (key) =>
        placements[key].points[0] === align.points[0] &&
        placements[key].points[1] === align.points[1],
    )[0];
    if (!placement) {
      return;
    }
    // 根据当前坐标设置动画点
    const rect = domNode.getBoundingClientRect();
    const transformOrigin = { top: '50%', left: '50%' };

    if (placement.indexOf('top') >= 0 || placement.indexOf('Bottom') >= 0) {
      transformOrigin.top = `${rect.height - align.offset[1]}px`;
    } else if (placement.indexOf('Top') >= 0 || placement.indexOf('bottom') >= 0) {
      transformOrigin.top = `${-align.offset[1]}px`;
    }

    if (placement.indexOf('left') >= 0 || placement.indexOf('Right') >= 0) {
      transformOrigin.left = `${rect.width - align.offset[0]}px`;
    } else if (placement.indexOf('right') >= 0 || placement.indexOf('Left') >= 0) {
      transformOrigin.left = `${-align.offset[0]}px`;
    }
    domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
  };

  const getOverlay = () => {
    const { title, overlay } = props;
    if (title === 0) {
      return title;
    }
    return overlay || title || '';
  };

  const {
    prefixCls = DEFAULT_PREFIXCLS,
    openClassName,
    getPopupContainer,
    getTooltipContainer,
    overlayClassName,
  } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const children = props.children as React.ReactElement<any>;
  let tempVisible = visible;
  // Hide tooltip when there is no title
  if (!('visible' in props) && isNoTitle()) {
    tempVisible = false;
  }
  const wrapChildren = isValidElement(children) ? children : <span>{children}</span>;
  const child = getDisabledCompatibleChildren(wrapChildren, prefixCls);
  const childProps = child.props;
  const childCls = classNames(childProps.className, {
    [openClassName || `${prefixCls}-open`]: true,
  });

  return (
    <RcTooltip
      {...props}
      prefixCls={prefixCls}
      overlayClassName={overlayClassName}
      getTooltipContainer={getPopupContainer || getTooltipContainer}
      ref={ref}
      builtinPlacements={getTooltipPlacements()}
      overlay={getOverlay()}
      visible={tempVisible}
      onVisibleChange={onVisibleChange}
      onPopupAlign={onPopupAlign}
    >
      {tempVisible ? cloneElement(child, { className: childCls }) : child}
    </RcTooltip>
  );
});

Tooltip.defaultProps = {
  placement: 'top',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  arrowPointAtCenter: false,
  autoAdjustOverflow: true,
};
Tooltip.displayName = 'Tooltip';

export default Tooltip;

const TooltipMemo = React.memo(Tooltip);
TooltipMemo.displayName = 'TooltipMemo';
export { TooltipMemo };
