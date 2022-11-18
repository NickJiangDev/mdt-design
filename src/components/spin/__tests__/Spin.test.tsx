import { render } from '@testing-library/react';
import Spin from '../index';

describe('Spin', () => {
  test('Spin正确渲染', () => {
    const { container } = render(<Spin />);
    expect(container).toBeInTheDocument();
  });
});
