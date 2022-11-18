import { render } from '@testing-library/react';
import CascadeCheckList from '@/components/cascade-check-list';

describe('CascadeCheckList', () => {
  test('CascadeCheckList正确渲染', () => {
    render(<CascadeCheckList data={[]} />);
  });
});
