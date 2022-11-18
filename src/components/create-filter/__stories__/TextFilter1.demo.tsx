import * as React from 'react';
import { TextFilter } from '@/components/create-filter';
import Button from '@/components/button/Button';
import { PriviewProps } from '@/__stories-template__/DocPreview';
import { DocPreview } from '@/__stories-template__';
import { FilterTypeKeys, TextFilterTypeSet } from '../__private__/constant';
import { LabelValueItemInterface } from '@/components/_utils/interfaces';

const list: string[] = [];
const values: string[] = [];
let sum = 0;
for (let i = 0; i < 500; i++) {
  sum += i;
  list.push(`中文中文${sum}`);
  if (i % 2 === 0) {
    list.push(`英文英文${sum}`);
    values.push(`英文英文${sum}`);
  }
}

const labelValueList: LabelValueItemInterface[] = [
  {
    label: '南西',
    value: '南西',
    disabled: true,
  },
  {
    label: '东南南西北',
    value: '东南南西北',
  },
  {
    label: '西北北',
    value: '西北北',
    disabled: true,
  },
  {
    label: '东北',
    value: '东北',
  },
  {
    label: '东东南西北北东北',
    value: '东东南西北北东北',
  },
  {
    label: '北',
    value: '北',
  },
  {
    label: '南',
    value: '南',
    disabled: false,
  },
];
const TextFilter1Demo = (props: PriviewProps) => {
  const [vals, setVals] = React.useState(values);
  const [vals2, setVals2] = React.useState(values);
  const [vals3, setVals3] = React.useState(['南西', '东北']);
  const [filterVals, setFilgerVals] = React.useState({
    $and: [
      {
        $or: [
          {
            type: FilterTypeKeys.contain,
            value: undefined,
          },
          {
            $not: {
              type: FilterTypeKeys.contain,
              value: undefined,
            },
          },
        ],
      },
    ],
  });
  const onOk = React.useCallback((v) => {
    setVals(v);
  }, []);

  const onOk2 = React.useCallback((v, f) => {
    console.log(f);
    setVals2(v);
    setFilgerVals(f);
  }, []);

  const onOk3 = React.useCallback((v) => {
    setVals3(v);
  }, []);

  return (
    <DocPreview {...props}>
      <h3>基本</h3>
      <TextFilter loading={false} values={vals} list={list} onOk={onOk}>
        <Button>open</Button>
      </TextFilter>

      <h3>基本 LabelValueInterface</h3>
      <TextFilter loading={false} values={vals3} list={labelValueList} onOk={onOk3}>
        <Button>open</Button>
      </TextFilter>
      <h3>筛选模式</h3>
      <TextFilter
        loading={false}
        values={vals2}
        list={list}
        onOk={onOk2}
        type={TextFilterTypeSet.standard}
        searchOptions={[
          { key: 'test-a', label: 'a', value: 'test-a' },
          { key: 'test-aaa', label: 'aaa', value: 'test-aaa' },
        ]}
        filterData={filterVals}
      >
        <Button>open</Button>
      </TextFilter>
    </DocPreview>
  );
};
export default TextFilter1Demo;
