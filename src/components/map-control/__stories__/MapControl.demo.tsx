import MapControl, {
  LayoutDirection,
  NormalToolboxProps,
  ToggleableToolboxLayoutDirection,
  ToggleableToolboxProps,
  ZoomToolbox,
} from '@/components/map-control';
import { useState } from 'react';

const wrapperStyle = {
  display: 'grid',
  gridTemplateRows: '40px',
  justifyItems: 'center',
  borderRight: '1px solid var(--dmc-split-color)',
  width: '100%',
};

const getTypeStyles = (part: number) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${part}, 1fr)`,
  alignItems: 'center',
  justifyItems: 'center',
});

const normalToolbox: NormalToolboxProps = {
  // 一般菜单
  id: 'file-folder',
  icon: 'file-folder',
  tooltip: 'folder',
  onClick: (id: string) => console.log(id),
};

const toggleableToolbox: ToggleableToolboxProps = {
  // 可伸缩菜单
  id: 'map-2',
  icon: 'map-2',
  onClick: (id: string) => console.log(id),
  tooltip: 'map',
  // 伸缩方向
  layoutDirection: ToggleableToolboxLayoutDirection.right,
  subItems: [
    {
      id: 'maximize',
      icon: 'maximize',
      tooltip: 'maximize',
      onClick: (id: string) => console.log(id),
    },
    {
      id: 'screenshot',
      icon: 'screen-shot',
      tooltip: 'screenshot',
      onClick: (id: string) => console.log(id),
    },
    { id: 'ruler', icon: 'ruler', tooltip: 'ruler', onClick: (id: string) => console.log(id) },
    { id: 'reset', icon: 'reset', tooltip: 'reset', onClick: (id: string) => console.log(id) },
  ],
};

const MapControlDemo = () => {
  const [zoom, setZoom] = useState(15);
  const zoomToolbox: ZoomToolbox = {
    // zoom 控制
    id: 'map-zoom-toolbox',
    zoom,
    onZoomIn: () => {
      console.log('zoom in');
      setZoom((pre) => ++pre);
    },
    onZoomOut: () => {
      console.log('zoom out');
      setZoom((pre) => --pre);
    },
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoRows: '150px 250px',
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
      <div style={wrapperStyle}>
        <span>一般菜单</span>
        <div style={getTypeStyles(1)}>
          <MapControl
            layoutDirection={LayoutDirection.column} // 布局方向
            toolboxes={[normalToolbox]}
          />
        </div>
      </div>
      <div style={wrapperStyle}>
        <span>Zoom控制</span>
        <div style={getTypeStyles(4)}>
          <MapControl layoutDirection={LayoutDirection.column} toolboxes={[zoomToolbox]} />
          <MapControl
            layoutDirection={LayoutDirection.column}
            toolboxes={[{ ...zoomToolbox, reverseLayout: true }]}
          />
          <MapControl layoutDirection={LayoutDirection.row} toolboxes={[{ ...zoomToolbox }]} />
          <MapControl
            layoutDirection={LayoutDirection.row}
            toolboxes={[{ ...zoomToolbox, reverseLayout: true }]}
          />
        </div>
      </div>
      <div style={wrapperStyle}>
        <span>可伸缩菜单(支持任意方向)</span>
        <div style={getTypeStyles(4)}>
          <MapControl
            toolboxes={[
              { ...toggleableToolbox, layoutDirection: ToggleableToolboxLayoutDirection.top },
            ]}
          />
          <MapControl toolboxes={[toggleableToolbox]} />
          <MapControl
            toolboxes={[
              { ...toggleableToolbox, layoutDirection: ToggleableToolboxLayoutDirection.bottom },
            ]}
          />
          <MapControl
            toolboxes={[
              { ...toggleableToolbox, layoutDirection: ToggleableToolboxLayoutDirection.left },
            ]}
          />
        </div>
      </div>
      <div style={wrapperStyle}>
        <span>主体布局方向 - layoutDirection</span>
        <div style={getTypeStyles(2)}>
          <MapControl toolboxes={[normalToolbox, zoomToolbox, toggleableToolbox]} />
          <MapControl
            layoutDirection={LayoutDirection.row}
            toolboxes={[normalToolbox, { ...zoomToolbox, reverseLayout: true }, toggleableToolbox]}
          />
        </div>
      </div>
    </div>
  );
};
export default MapControlDemo;
