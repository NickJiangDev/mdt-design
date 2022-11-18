import { render } from '@testing-library/react';
import MapControl, { LayoutDirection, ToggleableToolboxLayoutDirection } from '../index';

describe('MapControl', () => {
  test('MapControl正确渲染', () => {
    const { container } = render(
      <MapControl
        layoutDirection={LayoutDirection.column}
        toolboxes={[
          {
            id: 'file-folder',
            icon: '',
            onClick: (id: string) => console.log(id),
          },
          {
            id: 'map-zoom-toolbox',
            onZoomIn: () => console.log('zoom in'),
            onZoomOut: () => console.log('zoom out'),
            reverseLayout: true,
          },
          {
            id: 'map-2',
            icon: 'map-2',
            onClick: (id: string) => console.log(id),
            layoutDirection: ToggleableToolboxLayoutDirection.right,
            subItems: [
              {
                id: 'maximize',
                icon: 'maximize',
                onClick: (id: string) => console.log(id),
              },
              {
                id: 'screenshot',
                icon: 'screen-shot',
                onClick: (id: string) => console.log(id),
              },
              { id: 'ruler', icon: 'ruler', onClick: (id: string) => console.log(id) },
              { id: 'reset', icon: 'reset', onClick: (id: string) => console.log(id) },
            ],
          },
        ]}
      />,
    );
    expect(container).toBeInTheDocument();
  });
});
