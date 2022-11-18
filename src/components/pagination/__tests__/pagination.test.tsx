import { render } from '@testing-library/react';
import Pagination from '../index';

describe('Pagination', () => {
  test('Pagination正确渲染', () => {
    const { container } = render(
      <Pagination pageCount={1000} pageRangeDisplayed={5} marginPagesDisplayed={2} />,
    );
    expect(container).toBeInTheDocument();
  });
});
