import { render } from '@testing-library/react';
import Progress from '../index';

describe('Progress', () => {
  test('Progress正确渲染', () => {
    const { container } = render(<Progress />);
    expect(container).toBeInTheDocument();
  });
});
