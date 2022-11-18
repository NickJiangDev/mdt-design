import SortList, { SortListItemType } from '../SortList';
import { LabelValueItemInterface } from '@/components/_utils/interfaces';
import { DropResult } from 'react-beautiful-dnd';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';
const arrContent: LabelValueItemInterface[] = [];

function generateType(): 'text' | 'number' | 'datetime' | '' {
  const randomNum = Math.floor(Math.random() * 3);
  switch (randomNum) {
    case 0:
      return 'text';
    case 1:
      return 'number';
    case 2:
      return 'datetime';
    default:
      return '';
  }
}

for (let i = 0; i < 10; i++) {
  arrContent.push({
    value: i.toString(),
    label: `选项-${i}`,
    type: generateType(),
  });
}
const SortListDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <SortList
        defaultList={arrContent} // 非受控
        // disabled={false} // (optional) 禁用拖拽
        removable // (optional) 可删除
        visibleUpDown // (optional) 置顶 置底 按钮
        listHeight={500} // （optional）默认高度
        useVirtual={false} // (optional) 禁用虚拟 - 默认禁用
        onChange={(items: SortListItemType[], dragResult?: DropResult) => {
          console.log('list changed, new list: ', items);
          console.log(dragResult, 'dragResult');
        }}
      />

      <h1>assist-bg</h1>
      <SortList
        type="assist-bg"
        defaultList={arrContent} // 非受控
        // disabled={false} // (optional) 禁用拖拽
        removable // (optional) 可删除
        visibleUpDown // (optional) 置顶 置底 按钮
        listHeight={500} // （optional）默认高度
        useVirtual={false} // (optional) 禁用虚拟 - 默认禁用
        onChange={(items: SortListItemType[], dragResult?: DropResult) => {
          console.log('list changed, new list: ', items);
          console.log(dragResult, 'dragResult');
        }}
      />
      <h1>mode: plain</h1>
      <SortList
        mode="plain"
        defaultList={arrContent} // 非受控
        // disabled={false} // (optional) 禁用拖拽
        listHeight={500} // （optional）默认高度
        useVirtual={false} // (optional) 禁用虚拟 - 默认禁用
        onChange={(items: SortListItemType[], dragResult?: DropResult) => {
          console.log('list changed, new list: ', items);
          console.log(dragResult, 'dragResult');
        }}
      />
    </DocPreview>
  );
};

export default SortListDemo;
