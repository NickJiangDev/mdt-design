import { render } from '@testing-library/react';
import Checkbox from '../index';

describe('Checkbox', () => {
  test('Checkbox正确渲染，', () => {
    const { container } = render(<Checkbox />);
    expect(container).toBeInTheDocument();
  });
});
