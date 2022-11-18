import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SideMenu from '../index';

describe('SideMenu', () => {
  test('SideMenu正确渲染', () => {
    const { container } = render(<SideMenu treeProps={{}} />);
    expect(container).toBeInTheDocument();
  });
});
