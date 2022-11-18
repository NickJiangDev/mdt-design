import { render } from '@testing-library/react';
import lazyLoad from '../index';

describe('LazyLoad', () => {
  test('lazyLoad调用成功', () => {
    const Demo = lazyLoad(() => import('../__stories__/LazyLoad1.demo')) || 'div';
    const { container } = render(<Demo />);
    expect(container).toBeInTheDocument();
  });
});
