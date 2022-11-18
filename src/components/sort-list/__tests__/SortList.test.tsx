import { render } from '@testing-library/react';
import SortList from '../index';

describe('SortList', () => {
  test('SortList正确渲染', () => {
    const { container } = render(<SortList />);
    expect(container).toBeInTheDocument();
  });
});
