import { render } from '@testing-library/react';
import Badges from '../index';

describe('Badges', () => {
  test('Badges正确渲染', () => {
    const { container } = render(<Badges />);
    expect(container).toBeInTheDocument();
  });
});
