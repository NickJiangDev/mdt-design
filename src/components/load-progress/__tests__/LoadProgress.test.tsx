import { render } from '@testing-library/react';
import LoadProgress from '../index';

describe('LoadProgress', () => {
  test('LoadProgress正确渲染', () => {
    const { container } = render(<LoadProgress />);
    expect(container).toBeInTheDocument();
  });
});
