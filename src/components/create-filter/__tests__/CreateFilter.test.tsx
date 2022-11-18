import { render, screen } from '@testing-library/react';
import { CreateFilter } from '@/components/create-filter';

describe('CreateFilter', () => {
  test('CreateFilter正确渲染，且文字为button', () => {
    const text = 'button';
    render(<CreateFilter>{text}</CreateFilter>);
    expect(screen.queryByText(text)).toBeInTheDocument();
  });
});
