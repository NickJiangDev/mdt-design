import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';
import React, { useState } from 'react';
import Tree from '../index';

const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];

const Demo = (props: PriviewProps) => {
  const [expandedKeys, setExpandedKeys] = useState<React.ReactText[]>(['0-0-0', '0-0-1']);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [checkedKeys, setCheckedKeys] = useState<any>(['0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState<React.ReactText[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeys: React.ReactText[]) => {
    console.log('onExpand', expandedKeys);
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = (
    checkedKeys: React.ReactText[] | { checked: React.ReactText[]; halfChecked: React.ReactText[] },
  ) => {
    console.log('onCheck', checkedKeys);
    setCheckedKeys(checkedKeys);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelect = (selectedKeys: React.ReactText[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeys);
  };

  return (
    <DocPreview {...props}>
      <div style={{ height: 300 }}>
        <Tree
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          treeData={treeData}
        />
      </div>
    </DocPreview>
  );
};

export default Demo;
