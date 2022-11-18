import React from 'react';
import Tree from '../index';
import Icon from '@/components/icon';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          { title: <span style={{ color: '#1890ff' }}>我是自定义颜色</span>, key: '0-0-1-0' },
        ],
      },
    ],
  },
];

const treeData1 = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <Icon icon="help"></Icon>,
    children: [
      {
        title: 'leaf',
        key: '0-0-0',
        icon: <Icon icon="help-2" />,
      },
      {
        title: 'leaf',
        key: '0-0-1',
        icon: ({ selected }: { selected: boolean }) => (
          <Icon icon={selected ? 'info' : 'close'}></Icon>
        ),
      },
    ],
  },
];

function getTreeData() {
  // big-data: generateData(1000, 3, 2)
  return [
    {
      key: '0',
      title: 'node 0',
      children: [
        { key: '0-0', title: 'node 0-0' },
        { key: '0-1', title: 'node 0-1' },
        {
          key: '0-2',
          title: 'node 0-2',
          children: [
            { key: '0-2-0', title: 'node 0-2-0' },
            { key: '0-2-1', title: 'node 0-2-1' },
            { key: '0-2-2', title: 'node 0-2-2' },
          ],
        },
        { key: '0-3', title: 'node 0-3' },
        { key: '0-4', title: 'node 0-4' },
        { key: '0-5', title: 'node 0-5' },
        { key: '0-6', title: 'node 0-6' },
        { key: '0-7', title: 'node 0-7' },
        { key: '0-8', title: 'node 0-8' },
        {
          key: '0-9',
          title: 'node 0-9',
          children: [
            { key: '0-9-0', title: 'node 0-9-0' },
            {
              key: '0-9-1',
              title: 'node 0-9-1',
              children: [
                { key: '0-9-1-0', title: 'node 0-9-1-0' },
                { key: '0-9-1-1', title: 'node 0-9-1-1' },
                { key: '0-9-1-2', title: 'node 0-9-1-2' },
                { key: '0-9-1-3', title: 'node 0-9-1-3' },
                { key: '0-9-1-4', title: 'node 0-9-1-4' },
              ],
            },
            {
              key: '0-9-2',
              title: 'node 0-9-2',
              children: [
                { key: '0-9-2-0', title: 'node 0-9-2-0' },
                { key: '0-9-2-1', title: 'node 0-9-2-1' },
              ],
            },
          ],
        },
      ],
    },
    {
      key: '1',
      title: 'node 1',
      children: new Array(1000)
        .fill(null)
        .map((_, index) => ({ title: `auto ${index}`, key: `auto-${index}` })),
    },
  ];
}

const Demo = (props: PriviewProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelect = (selectedKeys: React.ReactText[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (
    checkedKeys:
      | React.ReactText[]
      | {
          checked: React.ReactText[];
          halfChecked: React.ReactText[];
        },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info: any,
  ) => {
    console.log('onCheck', checkedKeys, info);
  };

  return (
    <DocPreview {...props}>
      <div style={{ height: 300 }}>
        <Tree
          defaultExpandedKeys={['0-0-0', '0-0-1']}
          defaultSelectedKeys={['0-0-0', '0-0-1']}
          defaultCheckedKeys={['0-0-0', '0-0-1']}
          onSelect={onSelect}
          onCheck={onCheck}
          icon={(props) => {
            return props.data?.children ? (
              <Icon icon="folder-outlined" />
            ) : (
              <Icon icon="location-outlined" />
            );
          }}
          treeData={treeData}
        />
      </div>

      <h2>自定义icon</h2>

      <div style={{ height: 300 }}>
        <Tree
          showIcon
          defaultExpandAll
          defaultSelectedKeys={['0-0-0']}
          switcherIcon={<Icon icon="add" />}
          treeData={treeData1}
        />
      </div>

      <h2>full模式</h2>
      <div style={{ height: 300 }}>
        <Tree
          defaultExpandedKeys={['0-0-0', '0-0-1']}
          defaultSelectedKeys={['0-0-0', '0-0-1']}
          defaultCheckedKeys={['0-0-0', '0-0-1']}
          onSelect={onSelect}
          onCheck={onCheck}
          icon={(props) => {
            return props.data?.children ? <Icon icon="folder" /> : <Icon icon="location" />;
          }}
          treeData={treeData}
          fullSelect
        />
      </div>

      <h2>virtual</h2>
      <Tree
        defaultExpandAll={false}
        height={200}
        style={{ border: '1px solid #000' }}
        treeData={getTreeData()}
      />
    </DocPreview>
  );
};

export default Demo;
