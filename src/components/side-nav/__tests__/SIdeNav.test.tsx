import { render } from '@testing-library/react';
import SideNav from '../index';

describe('SideNav', () => {
  test('SideNav正确渲染', () => {
    const { container } = render(<SideNav />);
    expect(container).toBeInTheDocument();
  });
});
