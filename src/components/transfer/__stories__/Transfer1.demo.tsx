import * as React from 'react';
import Transfer, { TransferMode } from '@/components/transfer';
import { TreeLabelValueItemInterface } from '../../check-list';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

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

const options1: TreeLabelValueItemInterface[] = [];
const values1: string[] = [];
let sum = 0;
for (let i = 0; i < 100; i++) {
  sum += i;
  options1.push({
    title: `中文中文${sum}`,
    key: `c${i}`,
    type: generateType(),
  });
  if (i % 2 === 0) {
    options1.push({
      title: `英文英文${sum}`,
      key: `e${i}`,
      type: generateType(),
    });
  }
}

const options2: TreeLabelValueItemInterface[] = [];
const values2: string[] = [];
for (let i = 0; i < 20; i++) {
  const item: TreeLabelValueItemInterface = {
    title: `文字${i}`,
    key: `key-${i}`,
    children: [],
  };
  for (let j = 0; j < 10; j++) {
    const secItem: TreeLabelValueItemInterface = {
      title: `文字${i}-${j}`,
      key: `key-${i}-${j}`,
    };
    if (j % 2 === 0) {
      secItem.children = [];
      for (let k = 0; k < 5; k++) {
        secItem.children?.push({
          title: `文字${i}-${j}-${k}`,
          key: `key-${i}-${j}-${k}`,
        });
      }
    }
    item.children?.push(secItem);
  }
  options2.push(item);
}

const TransferDemo = (props: PriviewProps) => {
  const [val1, setVal1] = React.useState(values1);
  const onChange1 = React.useCallback((v) => {
    setVal1(v);
  }, []);
  const [val2, setVal2] = React.useState(values2);
  const onChange2 = React.useCallback((v) => {
    setVal2(v);
  }, []);
  const onRemove1 = React.useCallback((v) => {
    setVal1(v);
  }, []);
  const onRemove2 = React.useCallback((v) => {
    setVal2(v);
  }, []);
  return (
    <DocPreview {...props}>
      <h4>基本list - mode: normal</h4>
      <Transfer
        allowClear
        sortListDescriptionText="已选字段"
        // showCount={false}
        allSelectLabel
        showTip
        options={options1}
        mode={TransferMode.normal} // (optional) default normal
      />
      <h4>基本list - mode: plain</h4>
      <Transfer
        options={options1}
        allowClear
        allowClearText="这是清空按钮的文本 点我清空"
        sortable
        mode={TransferMode.plain}
        sortListDescriptionText="已选字段"
        checkListDescriptionText="描述文本"
        showCount={false}
        allSelectLabel="全选"
        sortListVirtualized
      />
      <h4>基本list - assist bg</h4>
      <Transfer options={options1} type="assist-bg" />
      <h4>基本tree</h4>
      <Transfer options={options2} />
      <h4>受控list</h4>
      <Transfer options={options1} value={val1} onChange={onChange1} onRemove={onRemove1} />
      <h4>受控tree</h4>
      <Transfer options={options2} value={val2} onChange={onChange2} onRemove={onRemove2} />
    </DocPreview>
  );
};

export default TransferDemo;
