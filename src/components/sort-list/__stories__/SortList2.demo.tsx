import * as React from 'react';
import SortList from '../SortList';
import { LabelValueItemInterface } from '@/components/_utils/interfaces';

const tmpList: LabelValueItemInterface[] = [];
for (let i = 0; i < 10; i++) {
  tmpList.push({
    value: i.toString(),
    label: `选项-${i}`,
  });
}

const tmp1 = [
  {
    geometryType: 'point',
    objectType: '佛山二手房_挂牌',
    packageUuid: '014d0c28-7ca2-4e0b-9265-d686a246f61b',
    source: 'market',
    fields: {},
    title: '佛山二手房_挂牌',
    key: '014d0c28-7ca2-4e0b-9265-d686a246f61b',
    expanded: false,
    selected: false,
    checked: false,
    loaded: false,
    loading: false,
    halfChecked: false,
    dragOver: false,
    dragOverGapTop: false,
    dragOverGapBottom: false,
    pos: '0-0',
    active: false,
    value: '014d0c28-7ca2-4e0b-9265-d686a246f61b',
    label: '佛山二手房_挂牌',
  },
];

const SortListDemo = () => {
  // const [list, setList] = useState<LabelValueItemInterface[]>(tmpList);

  const onChange = React.useCallback((items) => {
    console.log(`items`, items);
  }, []);
  return (
    <React.Fragment>
      <h1>基本使用-受控</h1>
      {/* <SortList
        list={list} // 受控列表
        // disabled={false}
        removable
        visibleUpDown
        listHeight={500}
        useVirtual={false}
        onChange={(items: SortListItemType[]) => {
          console.log('list changed, new list: ', items);
          setList(items as LabelValueItemInterface[]);
        }}
      /> */}

      <SortList
        list={tmp1}
        disabled={false}
        onChange={onChange}
        removable
        // renderItem={suppFilterRender}
      />
    </React.Fragment>
  );
};

export default SortListDemo;
