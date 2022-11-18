import { render } from '@testing-library/react';
import Menu, { MenuItem, MenuDivider } from '../Menu';

describe('Menu', () => {
  test('Menu正确渲染', () => {
    const { container } = render(
      <Menu>
        <MenuItem key={1} title="第一步">
          第一步
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={() => console.log(1)} title="第四步">
          第四步
        </MenuItem>
      </Menu>,
    );
    expect(container).toBeInTheDocument();
  });
});
