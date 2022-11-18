import { render } from '@testing-library/react';
import Steps from '../index';

describe('Steps', () => {
  test('Steps正确渲染', () => {
    const { container } = render(<Steps />);
    expect(container).toBeInTheDocument();
  });
});
