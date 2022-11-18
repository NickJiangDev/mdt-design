import { render } from '@testing-library/react';
import Popover from '../index';

describe('Popover', () => {
  test('Popover正确渲染', () => {
    const { container } = render(<Popover />);
    expect(container).toBeInTheDocument();
  });
});
