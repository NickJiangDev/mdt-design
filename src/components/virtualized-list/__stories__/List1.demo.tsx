import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';
import * as React from 'react';
import VirtualizedList, { ItemViewProps } from '../VirtualizedList';

interface Item {
  id?: string;
  style?: React.CSSProperties;
  height?: number;
}

const generateDynamicHeight = () => Math.floor(Math.random() * 100);

export const data: Item[] = [];
export const data2: Item[] = [];
const data3: Item[] = [];
for (let i = 0; i < 1000; i += 1) {
  data.push({ id: String(i) });
  data3.push({ id: i.toString(), height: generateDynamicHeight() });
}

for (let i = 0; i < 5; i += 1) {
  data2.push({ id: String(i) });
}

export const TestItem = React.memo<ItemViewProps>(({ item, className, style }) => {
  return (
    <div style={{ ...style, height: item.height }} className={className}>
      {item.id}
    </div>
  );
});

const DynamicHeightItem = React.memo<ItemViewProps>(({ item, className, style }) => {
  return (
    <div
      style={{
        ...style,
        height: item.height,
        border: '1px solid #fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className={className}
    >
      itemHeight: {item.height}
    </div>
  );
});

const ListDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <h4>固定大小列表</h4>
      <div
        style={{
          border: '1px solid var(--dmc-split-color)',
          borderRadius: 4,
          width: 300,
          boxShadow: 'var(--dmc-box-shadow-100)',
        }}
      >
        <VirtualizedList data={data} ItemView={TestItem} width={300} height={400} noBorder />
      </div>
      <h4>自适应容器高度和宽度</h4>
      <div
        style={{
          border: '1px solid var(--dmc-split-color)',
          borderRadius: 4,
          width: 300,
          boxShadow: 'var(--dmc-box-shadow-100)',
        }}
      >
        <VirtualizedList data={data2} ItemView={TestItem} noBorder />
      </div>
      <h4>内容小于（列表）最大高度</h4>
      <div
        style={{
          border: '1px solid var(--dmc-split-color)',
          borderRadius: 4,
          width: 300,
          boxShadow: 'var(--dmc-box-shadow-100)',
        }}
      >
        <VirtualizedList
          data={data2}
          maxHeight={200} // 列表最大高度
          ItemView={TestItem}
          noBorder
        />
      </div>
      <h4>内容大于（列表）最大高度</h4>
      <div
        style={{
          border: '1px solid var(--dmc-split-color)',
          borderRadius: 4,
          width: 300,
          boxShadow: 'var(--dmc-box-shadow-100)',
        }}
      >
        <VirtualizedList
          data={data}
          maxHeight={200} // 列表最大高度
          ItemView={TestItem}
          noBorder
        />
      </div>
      <h4>动态行高</h4>
      <div
        style={{
          border: '1px solid var(--dmc-split-color)',
          borderRadius: 4,
          width: 300,
          boxShadow: 'var(--dmc-box-shadow-100)',
        }}
      >
        <VirtualizedList
          data={data3}
          ItemView={DynamicHeightItem}
          maxHeight={200}
          minRowHeight={20} // 最小行高
          noBorder
          dynamicRowHeight // 动态行高
        />
      </div>
    </DocPreview>
  );
};

export default ListDemo;
