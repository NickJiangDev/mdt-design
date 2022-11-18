import { render } from '@testing-library/react';
import Dot from '../Dot';

describe('Dot', () => {
  test('Dot正确渲染', () => {
    const { container } = render(<Dot />);
    expect(container).toBeInTheDocument();
  });
});
