import { render, screen } from '@testing-library/react';
import { DateFilter } from '@/components/create-filter';

describe('DateFilter', () => {
  test('DateFilter正确渲染，且文字为button', () => {
    const text = 'button';
    render(<DateFilter>{text}</DateFilter>);
    expect(screen.queryByText(text)).toBeInTheDocument();
  });
});
