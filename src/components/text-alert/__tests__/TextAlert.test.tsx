import { render } from '@testing-library/react';
import TextAlert from '../TextAlert';

describe('TextAlert', () => {
  test('TextAlert正确渲染', () => {
    const { container } = render(<TextAlert message={'测试'} />);
    expect(container).toBeInTheDocument();
  });
});
