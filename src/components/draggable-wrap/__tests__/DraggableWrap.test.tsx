import { render, screen } from '@testing-library/react';
import DraggableWrap from '@/components/draggable-wrap';

describe('DraggableWrap', () => {
  test('DraggableWrap正确渲染，且文字为button', () => {
    const text = 'button';
    render(<DraggableWrap>{text}</DraggableWrap>);
    expect(screen.queryByText(text)).toBeInTheDocument();
  });
});
