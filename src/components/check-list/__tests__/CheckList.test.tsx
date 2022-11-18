import { render } from '@testing-library/react';
import CheckList, { TreeCheckList } from '@/components/check-list';

describe('CheckList', () => {
  test('CheckList正确渲染', () => {
    render(<CheckList loading={false} />);
  });
});

describe('TreeCheckList', () => {
  test('TreeCheckList正确渲染', () => {
    render(<TreeCheckList loading={false} />);
  });
});
