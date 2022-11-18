import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';
import React from 'react';
import TreeSelect, { TreeNode, SHOW_PARENT, SelectValue } from '../TreeSelect';
const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
  },
];
const Demo = React.memo((props: PriviewProps) => {
  const [value, setValue] = React.useState<SelectValue>();
  const onChange = (value: SelectValue) => {
    setValue(value);
  };

  return (
    <DocPreview {...props}>
      <h2>受控</h2>
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
        notFoundContent="无选项"
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
      </TreeSelect>

      <h2>多选</h2>
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        multiple
        treeDefaultExpandAll
        onChange={onChange}
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
      </TreeSelect>
      <h2>treeData</h2>
      <TreeSelect
        style={{ width: '100%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeData}
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={onChange}
      />

      <h2>full 模式</h2>
      <TreeSelect
        style={{ width: '100%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeData}
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={onChange}
        fullSelect
      />
      <h2>checkbox多选</h2>
      <TreeSelect
        style={{ width: '100%' }}
        value={value}
        treeData={treeData}
        treeCheckable
        showCheckedStrategy={SHOW_PARENT}
        placeholder="Please select"
        onChange={onChange}
      />
    </DocPreview>
  );
});

export default Demo;
