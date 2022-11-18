import { render } from '@testing-library/react';
import Drawer from '@/components/drawer';

describe('Drawer', () => {
  test('Drawer正确渲染', () => {
    const { container } = render(<Drawer />);
    expect(container).toBeInTheDocument();
  });
});
