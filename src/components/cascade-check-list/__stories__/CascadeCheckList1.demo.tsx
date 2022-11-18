import CascadeCheckList, { CheckedStatus, TreeNode } from '@/components/cascade-check-list';
import Icon from '@/components/icon';
import { PriviewProps } from '@/__stories-template__/DocPreview';
import { DocPreview } from '@/__stories-template__';
import { useState } from 'react';

const data: TreeNode[] = [
  {
    id: 'A1',
    val: 'looooooooog value A',
    children: [
      {
        id: 'B1',
        val: 'B',
        children: [
          {
            id: 'D1',
            val: 'D',
            children: [] as TreeNode[],
          },
          {
            id: 'E1',
            val: 'E',
            children: [] as TreeNode[],
          },
        ],
      },
      {
        id: 'C1',
        val: 'C',
        children: [
          {
            id: 'F1',
            val: 'F',
            children: [] as TreeNode[],
          },
          {
            id: 'G1',
            _id: ['A1', 'C1', 'G1'], // 叶子节点可选通路数据，勾选变化时优先返回通路
            val: 'G',
            children: [] as TreeNode[],
          },
        ],
      },
    ],
  },
  {
    id: 'H1',
    val: 'H',
    children: [],
  },
];

const showSearchLevel = [0];
const levelSearchInputPlaceholder = ['Description'];
const levelTitles = ['Root Title', 'Sub Title'];
const CascadeCheckListDemo1 = (args: PriviewProps) => {
  const [checkedIds, setCheckedIds] = useState(['F1', 'G1']);
  const initCheckedIds = ['F1', 'G1'];
  const [treeData] = useState<TreeNode[]>(data);

  return (
    <DocPreview {...args}>
      <h4>基本用法</h4>
      <CascadeCheckList
        data={treeData}
        showSearchLevel={showSearchLevel} // 0 级显示 search
        levelSearchInputPlaceholder={levelSearchInputPlaceholder}
        levelTitles={levelTitles}
      />
      <h4>初始值</h4>
      <CascadeCheckList
        data={data}
        initCheckedIds={initCheckedIds} // 叶子节点 ID 保证唯一
        levelSearchInputPlaceholder={levelSearchInputPlaceholder}
        levelTitles={levelTitles}
      />
      <h4>受控</h4>
      <CascadeCheckList
        data={data}
        checkedIds={checkedIds} // 叶子节点 ID 保证唯一
        onChange={(
          newCheckedIds: string[],
          newCheckedIdsObj: { [id: string]: string | string[] },
        ) => {
          console.log('newCheckedIds: ', newCheckedIds);
          console.log('newCheckedIdsObj: ', newCheckedIdsObj);
          setCheckedIds(newCheckedIds);
        }}
        levelSearchInputPlaceholder={levelSearchInputPlaceholder}
        levelTitles={levelTitles}
      />
      <h4>动态列宽</h4>
      <CascadeCheckList
        data={treeData}
        showSearchLevel={showSearchLevel} // 0 级显示 search
        levelSearchInputPlaceholder={levelSearchInputPlaceholder}
        rowWidth={'auto'} // 动态列宽
        rowMinWidth={100}
        levelTitles={['Rooooooooooooooooooooooooooooot Title', 'Suuuuuuuuuuuub Title']}
      />
      <h4>自定义层级渲染</h4>
      <CascadeCheckList
        data={data}
        levelShowCheckbox={[1, 2]}
        showSearchLevel={[0]}
        levelSearchInputPlaceholder={levelSearchInputPlaceholder}
        levelTitles={levelTitles}
        levelSelectAll={[1, 2]}
        customRendererLevel={[0]}
        renderer={(
          index: number,
          val: string,
          checkedStatus: CheckedStatus,
          isLeafNode: boolean,
        ) => {
          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <span style={{ minWidth: '18px' }}>
                {checkedStatus.checkedObj[index] && <Icon icon="done-check" size={16} />}
              </span>
              <span style={{ flex: 1 }}>{val}</span>
              {!isLeafNode && <Icon icon="play" size={16} />}
            </div>
          );
        }}
      />
      <h4>触发模式</h4>
      <CascadeCheckList
        data={treeData}
        showSearchLevel={showSearchLevel} // 0 级显示 search
        levelSearchInputPlaceholder={levelSearchInputPlaceholder}
        levelTitles={levelTitles}
        triggerType="click" // click（for mobile） | hover (default)
      />
    </DocPreview>
  );
};

export default CascadeCheckListDemo1;
