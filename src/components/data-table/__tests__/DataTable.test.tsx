import { render } from '@testing-library/react';
import DataTable from '../index';

describe('DataTable', () => {
  test('DataTable正确渲染', () => {
    const { container } = render(<DataTable columns={[]} rows={[]} />);
    expect(container).toBeInTheDocument();
  });
});
