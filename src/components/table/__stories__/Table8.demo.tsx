import { LeftCrossTreeNode, TopCrossTreeNode } from 'ali-react-table-fork/pivot';
import { ObjectInterface } from '@/components/_utils/interfaces';
import { CrossTable, CrossTreeTable } from '../index';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

function Demo(props: PriviewProps) {
  const leftTree: LeftCrossTreeNode[] = [
    {
      key: 'forenoon',
      value: '上午',
      children: [
        { key: '9', value: '9:00-10:00' },
        { key: '10', value: '10:00-11:00' },
        { key: '11', value: '11:00-12:00' },
      ],
    },
    { key: 'lunch', value: '午餐' },
    {
      key: 'afternoon',
      value: '下午',
      children: [
        { key: '14', value: '14:00-15:00' },
        { key: '15', value: '15:00-16:00' },
        { key: '16', value: '16:00-17:00' },
      ],
    },
    { key: 'dinner', value: '晚餐' },
    {
      key: 'evening',
      value: '晚上',
      children: [
        { key: '20', value: '20:00-21:00' },
        { key: '21', value: '21:00-22:00' },
      ],
    },
  ];

  const makeTopChildren = (keyPrefix: string): TopCrossTreeNode[] => [
    { key: `${keyPrefix}-week-0`, value: '第一周', width: 80 },
    { key: `${keyPrefix}-week-1`, value: '第二周', width: 80 },
    { key: `${keyPrefix}-week-2`, value: '第三周', width: 80 },
    { key: `${keyPrefix}-week-3`, value: '第四周', width: 80 },
  ];
  const topTree: TopCrossTreeNode[] = [
    { key: '2020-01', value: '2020-01', children: makeTopChildren('2020-01') },
    { key: '2020-02', value: '2020-02', children: makeTopChildren('2020-02') },
    { key: '2020-03', value: '2020-03', children: makeTopChildren('2020-03') },
    { key: '2020-04', value: '2020-04', children: makeTopChildren('2020-04') },
    { key: '2020-05', value: '2020-05', children: makeTopChildren('2020-05') },
    { key: '2020-06', value: '2020-06', children: makeTopChildren('2020-06') },
  ];

  const getValue = (leftNode: LeftCrossTreeNode, topNode: TopCrossTreeNode) => {
    if (leftNode.key === 'lunch') {
      if (topNode.key.endsWith('week-0')) {
        return '肯德基';
      } else if (topNode.key.endsWith('week-1')) {
        return '麦当劳';
      } else if (topNode.key.endsWith('week-2')) {
        return '汉堡王';
      } else {
        return '烧烤';
      }
    } else if (leftNode.key === 'dinner') {
      if (topNode.key.endsWith('week-0')) {
        return '盒马';
      } else if (topNode.key.endsWith('week-1')) {
        return '海底捞';
      } else if (topNode.key.endsWith('week-2')) {
        return '麦当劳';
      } else {
        return '体重+1';
      }
    }
  };

  //交叉表树状
  const leftTree1: LeftCrossTreeNode[] = [
    {
      key: 'forenoon',
      value: '上午',
      data: { parent: true },
      children: [
        { key: '9', value: '9:00-10:00', data: { x: 0 } },
        { key: '10', value: '10:00-11:00', data: { x: 1 } },
        { key: '11', value: '11:00-12:00', data: { x: 2 } },
      ],
    },
    {
      key: 'afternoon',
      value: '下午',
      data: { parent: true },
      children: [
        { key: '14', value: '14:00-15:00', data: { x: 3 } },
        { key: '15', value: '15:00-16:00', data: { x: 4 } },
        { key: '16', value: '16:00-17:00', data: { x: 5 } },
      ],
    },
    {
      key: 'evening',
      value: '晚上',
      data: { parent: true },
      children: [
        { key: '20', value: '20:00-21:00', data: { x: 7 } },
        { key: '21', value: '21:00-22:00', data: { x: 8 } },
      ],
    },
  ];

  const makeTopChildren1 = (keyPrefix: string): TopCrossTreeNode[] => [
    { key: `${keyPrefix}-week-0`, value: '第一周', data: { y: 0 } },
    { key: `${keyPrefix}-week-1`, value: '第二周', data: { y: 1 } },
    { key: `${keyPrefix}-week-2`, value: '第三周', data: { y: 2 } },
    { key: `${keyPrefix}-week-3`, value: '第四周', data: { y: 3 } },
  ];
  const topTree1: TopCrossTreeNode[] = [
    { key: '2020-01', value: '2020-01', children: makeTopChildren1('2020-01') },
    { key: '2020-02', value: '2020-02', children: makeTopChildren1('2020-02') },
    { key: '2020-03', value: '2020-03', children: makeTopChildren1('2020-03') },
    { key: '2020-04', value: '2020-04', children: makeTopChildren1('2020-04') },
    { key: '2020-05', value: '2020-05', children: makeTopChildren1('2020-05') },
    { key: '2020-06', value: '2020-06', children: makeTopChildren1('2020-06') },
  ];

  const getValue1 = (leftNode: LeftCrossTreeNode, topNode: TopCrossTreeNode) => {
    if (leftNode.data.parent) {
      const map: ObjectInterface = {
        forenoon: '万事开头难',
        afternoon: '然后中间难',
        evening: '最后结束难',
      };
      return map[leftNode.key];
    }

    const courses = ['数学', '英语', '计算机基础', '数据结构', '线性代数', '微积分', '概率论'];
    const i = (leftNode.data.x + topNode.data.y) % courses.length;
    return courses[i];
  };

  return (
    <DocPreview {...props}>
      <p style={{ fontSize: 16, marginTop: 0 }}>2020年 养猪计划</p>
      <h2>交叉表示例</h2>
      <CrossTable
        defaultColumnWidth={100}
        leftTree={leftTree}
        topTree={topTree}
        // 自定义的取数逻辑
        getValue={getValue}
        // 可选的 自定义的渲染逻辑
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render={(value) => {
          return value;
        }}
      />

      <h2>交叉表示例 border</h2>
      <CrossTable
        defaultColumnWidth={100}
        leftTree={leftTree}
        topTree={topTree}
        // 自定义的取数逻辑
        getValue={getValue}
        // 可选的 自定义的渲染逻辑
        render={(value) => {
          return value;
        }}
        style={{
          '--cell-border': '3px solid red',
          '--header-cell-border': '3px solid red',
        }}
      />

      <h2>交叉表示例 nopadding</h2>
      <CrossTable
        defaultColumnWidth={100}
        leftTree={leftTree}
        topTree={topTree}
        // 自定义的取数逻辑
        getValue={getValue}
        // 可选的 自定义的渲染逻辑
        render={(value) => {
          return value;
        }}
        noCellPadding={false}
      />
      <p style={{ fontSize: 16, marginTop: 0 }}>2020年 学习计划</p>
      <h2>交叉树状表格示例</h2>
      <CrossTreeTable
        // 非受控用法：
        defaultOpenKeys={[leftTree1[0].key]}
        // 受控用法：
        // const [openKeys, onChangeOpenKeys] = useState([leftTree[0].key])
        // openKeys={openKeys}
        // onChangeOpenKeys={onChangeOpenKeys}

        // 表格第一列的配置
        primaryColumn={{ lock: true, name: '数据维度', width: 200 }}
        defaultColumnWidth={100}
        leftTree={leftTree1}
        topTree={topTree1}
        getValue={getValue1}
      />

      <h2>交叉树状表格示例 noLocked</h2>
      <CrossTreeTable
        // 非受控用法：
        defaultOpenKeys={[leftTree1[0].key]}
        // 受控用法：
        // const [openKeys, onChangeOpenKeys] = useState([leftTree[0].key])
        // openKeys={openKeys}
        // onChangeOpenKeys={onChangeOpenKeys}

        // 表格第一列的配置
        primaryColumn={{ name: '数据维度', width: 200 }}
        defaultColumnWidth={100}
        leftTree={leftTree1}
        topTree={topTree1}
        getValue={getValue1}
      />
    </DocPreview>
  );
}

export default Demo;
