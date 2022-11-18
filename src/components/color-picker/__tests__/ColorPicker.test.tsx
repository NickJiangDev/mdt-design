import { render, screen } from '@testing-library/react';
import Button from '@/components/button';

describe('Button', () => {
  test('Button正确渲染，且文字为button', () => {
    const text = 'button';
    render(<Button>{text}</Button>);
    expect(screen.queryByText(text)).toBeInTheDocument();
  });
});
