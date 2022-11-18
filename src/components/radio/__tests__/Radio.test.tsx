import { render } from '@testing-library/react';
import Radio from '../index';

describe('Radio', () => {
  test('Radio正确渲染', () => {
    const { container } = render(<Radio value={'test'} />);
    expect(container).toBeInTheDocument();
  });
});
