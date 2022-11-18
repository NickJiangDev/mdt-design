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

const CheckList5Demo = (props: PriviewProps) => {
  const [vals, setVals] = React.useState(values);
  const onChange = React.useCallback((v) => {
    setVals(v);
  }, []);

  function customerRenderer(checked: boolean, title: string, value: string) {
    return (
      <span
        style={{
          color: checked ? 'red' : 'unset',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          overflow: 'auto',
        }}
      >
        {`${checked ? '\u2713' : '\u2717'} - title: ${title} value: ${value}`}
      </span>
    );
  }

  return (
    <DocPreview {...props}>
      <h2>自定义 renderer </h2>
      <CheckList
        noContentText="暂无数据"
        noResultText="搜索无结果"
        placeholder="搜索字段"
        loading={false}
        defaultValue={vals}
        options={list}
        onChange={onChange}
        text="abc"
        renderer={customerRenderer}
      />
    </DocPreview>
  );
};
export default CheckList5Demo;
