import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';
import * as React from 'react';
import GroupVirtualizedList, { GroupItemViewProps, GroupViewProps } from '../GroupVirtualizedList';

const data = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((index) => {
  return {
    title: index,
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
      return {
        title: `${index}-${i}`,
      };
    }),
  };
});

const ItemView = React.memo<GroupItemViewProps>(({ item, className }) => {
  return (
    <div
      className={className}
      style={{
        height: 40,
        color: '#D4D9EB',
        marginBottom: 4,
        boxSizing: 'border-box',
      }}
    >
      <p style={{ margin: 0, padding: 0 }}>{item.title}</p>
    </div>
  );
});

const GroupView = React.memo<GroupViewProps>(({ item, className }) => {
  return (
    <div className={className} style={{ color: '#5F6984', height: 20, lineHeight: 1 }}>
      {item.title}
    </div>
  );
});

const ListDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <h4>default</h4>
      <div>
        <GroupVirtualizedList
          width={300}
          height={400}
          data={data}
          ItemView={ItemView}
          GroupView={GroupView}
          defaultHeight={20}
        />
      </div>
      <h4>scrollToIndex</h4>
      <div style={{ width: 300, height: 200 }}>
        <GroupVirtualizedList
          data={data}
          ItemView={ItemView}
          GroupView={GroupView}
          scrollToIndex={15}
          type="menu-bg"
          defaultHeight={20}
        />
      </div>
      <h4>hide sticky title</h4>
      <div style={{ width: 300, height: 200 }}>
        <GroupVirtualizedList
          data={data}
          ItemView={ItemView}
          GroupView={GroupView}
          scrollToIndex={15}
          type="assist-bg"
          defaultHeight={20}
        />
      </div>
    </DocPreview>
  );
};

export default ListDemo;
