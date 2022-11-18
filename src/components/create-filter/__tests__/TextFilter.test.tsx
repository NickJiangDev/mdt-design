import { render, screen } from '@testing-library/react';
import { TextFilter } from '@/components/create-filter';

describe('TextFilter', () => {
  test('TextFilter正确渲染，且文字为button', () => {
    const text = 'button';
    render(<TextFilter>{text}</TextFilter>);
    expect(screen.queryByText(text)).toBeInTheDocument();
  });
});
