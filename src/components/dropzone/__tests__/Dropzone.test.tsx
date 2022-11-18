import { render } from '@testing-library/react';
import Dropzone from '../Dropzone';

describe('Dropzone', () => {
  test('Dropzone正确渲染', () => {
    const { container } = render(<Dropzone />);
    expect(container).toBeInTheDocument();
  });
});
