import { render, screen } from '@testing-library/react';
import { NumberFilter } from '@/components/create-filter';

describe('NumberFilter', () => {
  test('NumberFilter正确渲染，且文字为button', () => {
    const text = 'button';
    render(
      <NumberFilter labelMax="最大值" labelMin="最小值" statisticMax={122} statisticMin={3223}>
        {text}
      </NumberFilter>,
    );
    expect(screen.queryByText(text)).toBeInTheDocument();
  });
});
