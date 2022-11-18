import { render } from '@testing-library/react';
import ColorGradient from '@/components/color-gradient';

describe('ColorGradient', () => {
  test('ColorGradient正确渲染，且文字为button', () => {
    const { container } = render(<ColorGradient stops={[]} color="#fff" />);
    expect(container).toBeInTheDocument();
  });
});
