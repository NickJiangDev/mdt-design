import { render } from '@testing-library/react';
import TreeSelect, { TreeNode } from '../TreeSelect';

describe('TreeSelect', () => {
  test('TreeSelect正确渲染', () => {
    const { container } = render(
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
      >
        <TreeNode value="parent 1" title="parent 1">
          <TreeNode value="parent 1-0" title="parent 1-0">
            <TreeNode value="leaf1" title="my leaf" />
            <TreeNode value="leaf2" title="your leaf" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1">
            <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} />
          </TreeNode>
        </TreeNode>
      </TreeSelect>,
    );
    expect(container).toBeInTheDocument();
  });
});
