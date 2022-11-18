import * as React from 'react';
import CheckList from '@/components/check-list';
import { PriviewProps } from '@/__stories-template__/DocPreview';
import { DocPreview } from '@/__stories-template__';

const list: string[] = [];
const values: string[] = [];
let sum = 0;
for (let i = 0; i < 500; i++) {
  sum += i;
  list.push(`中文中文${sum}`);
  if (i % 2 === 0) {
    values.push(`英文英文${sum}`);
    list.push(`英文英文${sum}`);
  }
}

const CheckList3Demo = (props: PriviewProps) => {
  const [vals, setVals] = React.useState(values);
  const onChange = React.useCallback((v) => {
    setVals(v);
  }, []);

  return (
    <DocPreview {...props}>
      <div style={{ height: 'calc(100vh - 300px)', backgroundColor: '#fff' }}>
        <CheckList flexHeight loading={false} value={vals} options={list} onChange={onChange} />
      </div>
    </DocPreview>
  );
};
export default CheckList3Demo;
