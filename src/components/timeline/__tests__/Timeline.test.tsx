import { render } from '@testing-library/react';
import Timeline from '../index';

describe('Timeline', () => {
  test('Timeline正确渲染', () => {
    const { container } = render(<Timeline />);
    expect(container).toBeInTheDocument();
  });
});
