import { render } from '@testing-library/react';
import Collapse from '../index';

describe('Collapse', () => {
  test('Collapse正确渲染，', () => {
    const { container } = render(<Collapse />);
    expect(container).toBeInTheDocument();
  });
});
