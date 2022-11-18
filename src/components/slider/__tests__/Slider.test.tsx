import { render } from '@testing-library/react';
import Slider from '../index';

describe('Slider', () => {
  test('Slider正确渲染', () => {
    const { container } = render(<Slider />);
    expect(container).toBeInTheDocument();
  });
});
