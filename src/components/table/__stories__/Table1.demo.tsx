import React from 'react';
import Table from '../index';
import { ObjectInterface } from '@/components/_utils/interfaces';
import { DocPreview, FlexVerCenter } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const columns = [
  { title: 'A', dataIndex: 'a', width: 100 },
  { title: 'B', dataIndex: 'b', width: 100 },
  { title: 'C', dataIndex: 'c', width: 100 },
];

const data: ObjectInterface[] = [];
for (let i = 0; i < 100; i += 1) {
  data.push({
    key: i,
    a: `a${i}`,
    b: `b${i}`,
    c: `c${i}`,
  });
}

const Demo = React.memo((props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <h2>default-bg</h2>
      <FlexVerCenter style={{ padding: '20px 0' }}>
        <Table data={data} columns={columns} scroll={{ y: 200 }} />
      </FlexVerCenter>
    </DocPreview>
  );
});

export default Demo;
