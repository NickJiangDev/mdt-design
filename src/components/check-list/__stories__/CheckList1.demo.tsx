import * as React from 'react';
import CheckList from '@/components/check-list';
import { LabelValueItemInterface } from '@/components/_utils/interfaces';
import { PriviewProps } from '@/__stories-template__/DocPreview';
import { DocPreview } from '@/__stories-template__';
import { useDarkMode } from 'storybook-dark-mode';

const list: string[] = [];
const plainList: LabelValueItemInterface[] = [];
const values: string[] = [];
let sum = 0;
for (let i = 0; i < 500; i++) {
  sum += i;
  const val = `中文中文${sum}`;
  list.push(val);
  plainList.push({
    label: val,
    value: val,
    type: generateType(),
  });
  if (i % 2 === 0) {
    values.push(`英文英文${sum}`);
    list.push(`英文英文${sum}`);
  }
}

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

const CheckList1Demo = (props: PriviewProps) => {
  const dark = useDarkMode();
  const [vals, setVals] = React.useState(values);
  const onChange = React.useCallback((v) => {
    console.log(v);
    setVals(v);
  }, []);

  return (
    <DocPreview {...props}>
      <CheckList
        noContentText="暂无数据"
        noResultText="搜索无结果"
        placeholder="搜索字段"
        loading={false}
        defaultValue={vals}
        options={list}
        onChange={onChange}
        listHeight={400}
      />
      <h2>添加说明</h2>
      <CheckList
        noContentText="暂无数据"
        noResultText="搜索无结果"
        placeholder="搜索字段"
        loading={false}
        defaultValue={vals}
        options={list}
        onChange={onChange}
        text="abc"
      />
      <h2>mode: plain</h2>
      <CheckList
        mode="plain"
        noContentText="暂无数据"
        noResultText="搜索无结果"
        placeholder="搜索字段"
        loading={false}
        defaultValue={vals}
        options={plainList}
        onChange={onChange}
        listHeight={400}
      />
      <h2>mode: plain - showCheckbox</h2>
      <CheckList
        mode="plain"
        showCheckbox
        noContentText="暂无数据"
        noResultText="搜索无结果"
        placeholder="搜索字段"
        loading={false}
        defaultValue={vals}
        options={plainList}
        onChange={onChange}
        listHeight={400}
      />
      {dark && (
        <React.Fragment>
          <h2>assist-bg</h2>
          <div style={{ background: '#343C54' }}>
            <CheckList
              type="assist-bg"
              noContentText="暂无数据"
              noResultText="搜索无结果"
              placeholder="搜索字段"
              loading={false}
              defaultValue={vals}
              options={list}
              onChange={onChange}
            />
          </div>
        </React.Fragment>
      )}
    </DocPreview>
  );
};
export default CheckList1Demo;
