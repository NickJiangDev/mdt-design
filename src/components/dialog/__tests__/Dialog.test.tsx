import { render } from '@testing-library/react';
import Dialog from '../index';

describe('Dialog', () => {
  test('Dialog正确渲染', () => {
    const { container } = render(<Dialog />);
    expect(container).toBeInTheDocument();
  });
});
