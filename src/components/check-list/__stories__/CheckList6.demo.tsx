import * as React from 'react';
import CheckList from '@/components/check-list';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

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

const CheckList6Demo = (props: PriviewProps) => {
  const [vals, setVals] = React.useState(values);
  const onChange = React.useCallback((v) => {
    setVals(v);
  }, []);

  // 1. do not using `allSelectLabel` with `radio` or it will not work
  // 2. when using `radio` `value` will be sliced to length one
  return (
    <DocPreview {...props}>
      <CheckList
        radio
        allSelectLabel // useless
        loading={false}
        value={vals} // slice to length 1 even greater than 1
        options={list}
        onChange={onChange}
      />
    </DocPreview>
  );
};
export default CheckList6Demo;
