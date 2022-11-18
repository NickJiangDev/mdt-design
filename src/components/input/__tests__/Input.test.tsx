import { render } from '@testing-library/react';
import Input, { InputNumber, Password, Textarea, InputAnimation } from '../index';

describe('Input', () => {
  test('Input正确渲染', () => {
    const { container } = render(<Input />);
    expect(container).toBeInTheDocument();
  });
  test('InputNumber正确渲染', () => {
    const { container } = render(<InputNumber />);
    expect(container).toBeInTheDocument();
  });
  test('IPassword正确渲染', () => {
    const { container } = render(<Password />);
    expect(container).toBeInTheDocument();
  });
  test('ITextarea正确渲染', () => {
    const { container } = render(<Textarea />);
    expect(container).toBeInTheDocument();
  });
  test('InputAnimation正确渲染', () => {
    const { container } = render(<InputAnimation />);
    expect(container).toBeInTheDocument();
  });
});
