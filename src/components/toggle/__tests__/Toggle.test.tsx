import { render } from '@testing-library/react';
import Toggle from '../';

describe('Toggle', () => {
  test('Toggle正确渲染', () => {
    const { container } = render(<Toggle />);
    expect(container).toBeInTheDocument();
  });
});
