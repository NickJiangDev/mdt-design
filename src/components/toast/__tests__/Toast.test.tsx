import { render } from '@testing-library/react';
import { ToastContainer } from '../index';

describe('Toast', () => {
  test('ToastContainer正确渲染', () => {
    const { container } = render(<ToastContainer type="info" message="测试" />);
    expect(container).toBeInTheDocument();
  });
});
