import * as React from 'react';
import { useState } from 'react';
import SortList, { SortListItemType } from '../SortList';
import { LabelValueItemInterface } from '@/components/_utils/interfaces';
import { DraggableProvided } from 'react-beautiful-dnd';
import { IconButton } from '@/components/button';

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

const tmpList: LabelValueItemInterface[] = [];
for (let i = 0; i < 1000; i++) {
  tmpList.push({
    value: i.toString(),
    label: `选项-${i}`,
    type: generateType(),
  });
}

const SortListDemo = () => {
  const [list, setList] = useState<LabelValueItemInterface[]>(tmpList);
  return (
    <React.Fragment>
      <h1>基本使用-虚拟</h1>
      <SortList
        list={list}
        removable
        visibleUpDown
        listHeight={800}
        // listWidth={400}
        useVirtual={true}
        onChange={(items: SortListItemType[]) => {
          console.log('list changed, new list: ', items);
          setList(items as LabelValueItemInterface[]);
        }}
      />
      <h1>虚拟 mode: plain</h1>
      <SortList
        list={list}
        mode="plain"
        removable
        // visibleUpDown
        listHeight={800}
        // listWidth={400}
        useVirtual={true}
        onChange={(items: SortListItemType[]) => {
          console.log('list changed, new list: ', items);
          setList(items as LabelValueItemInterface[]);
        }}
      />
      <h1>虚拟 renderItem</h1>
      <SortList
        list={list}
        removable
        listHeight={240}
        listWidth={400}
        useVirtual={true}
        onChange={(items: SortListItemType[]) => {
          console.log('list changed, new list: ', items);
          setList(items as LabelValueItemInterface[]);
        }}
        renderItem={(
          provided: DraggableProvided,
          item: SortListItemType,
          index: number,
          isDraging: boolean,
          style?: React.CSSProperties,
        ) => {
          console.log(
            '🚀 ~ file: SortList3.demo.tsx ~ line 80 ~ SortListDemo ~ isDraging',
            isDraging,
          );

          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              key={index}
              style={style ?? {}}
            >
              <IconButton type="only-icon" icon="drag-handle" {...provided?.dragHandleProps} />
              {(item as LabelValueItemInterface).label}
            </div>
          );
        }}
      />
    </React.Fragment>
  );
};

export default SortListDemo;
