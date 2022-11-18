import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {{Demo}} from '../index';

describe('{{Demo}}', () => {
  test('{{Demo}}正确渲染', () => {
    const { container } = render(<{{Demo}} />);
    expect(container).toBeInTheDocument();
  });
});
