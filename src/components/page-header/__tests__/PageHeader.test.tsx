import { render } from '@testing-library/react';
import PageHeader from '../index';

describe('PageHeader', () => {
  test('PageHeader正确渲染', () => {
    const { container } = render(<PageHeader />);
    expect(container).toBeInTheDocument();
  });
});
