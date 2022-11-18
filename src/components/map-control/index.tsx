import * as React from 'react';
import './style/index.less';
import ZoomControl from './zoom-toolbox';
import NormalToolbox from './normal-toolbox';
import ToggleableToolbox from './toggleable-toolbox';
import { useMemo } from 'react';
import { TooltipPlacement } from '@/components/tooltip';

export const prefixCls = 'map-control';

export enum LayoutDirection {
  row = 'row',
  column = 'column',
}

export enum ToggleableToolboxLayoutDirection {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}

export interface ZoomToolbox {
  id: 'map-zoom-toolbox';
  zoom?: number | string;
  onValueClick?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  reverseLayout?: boolean;
}

export interface IconAndTooltipConfig {
  id: string;
  icon: string | React.ReactNode;
  tooltip?: string;
  tooltipPlacement?: TooltipPlacement;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}

export interface NormalToolboxProps extends IconAndTooltipConfig {
  onClick: (id: string, e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export interface ToggleableToolboxProps extends NormalToolboxProps {
  id: string;
  subItems: Array<NormalToolboxProps>;
  onClick: (id: string, e: React.MouseEvent) => void;
  layoutDirection?: ToggleableToolboxLayoutDirection;
}

export type Toolbox = NormalToolboxProps | ToggleableToolboxProps | ZoomToolbox;

interface MapControlProps {
  id?: string;
  toolboxes: Toolbox[];
  style?: React.CSSProperties;
  layoutDirection?: LayoutDirection;
}

function isMapZoom(tool: Toolbox): tool is ZoomToolbox {
  return tool.id === 'map-zoom-toolbox';
}

function isToggleableToolbox(tool: Toolbox): tool is ToggleableToolboxProps {
  return 'subItems' in tool;
}

const MapControl = React.memo(
  React.forwardRef<HTMLDivElement | null, MapControlProps>(
    ({ id, layoutDirection = LayoutDirection.column, toolboxes, style, ...restProps }, ref) => {
      const _style = useMemo<React.CSSProperties>(
        () => ({
          ...style,
          // flexDirection: layoutDirection === LayoutDirection.row ? 'row' : 'column',
          gridColumnGap: layoutDirection === LayoutDirection.row ? '8px' : undefined,
          gridRowGap: layoutDirection === LayoutDirection.column ? '8px' : undefined,
          gridAutoFlow: layoutDirection === LayoutDirection.row ? 'column' : 'row',
        }),
        [layoutDirection, style],
      );
      return (
        <div {...restProps} className={prefixCls} style={_style} ref={ref} id={id}>
          {toolboxes.map((tool) => {
            // guard
            if (isMapZoom(tool)) {
              return <ZoomControl {...tool} key={tool.id} displayDirection={layoutDirection} />;
            } else {
              return isToggleableToolbox(tool) ? (
                <ToggleableToolbox {...tool} key={tool.id} />
              ) : (
                <NormalToolbox {...tool} key={tool.id} />
              );
            }
          })}
        </div>
      );
    },
  ),
);

export default MapControl;
