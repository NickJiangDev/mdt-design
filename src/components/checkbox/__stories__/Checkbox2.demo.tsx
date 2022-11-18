import * as React from 'react';
import { DocPreview, Split } from '@/__stories-template__';
import Checkbox, { CheckboxGroup } from '@/components/checkbox';
import { PriviewProps } from '@/__stories-template__/DocPreview';
const opts1 = ['Apple', 'Pear', 'Orange'];
const OPT_LEN = opts1.length;
const opts2 = [
  { label: 'Apple', value: '1' },
  { label: 'Pear', value: '2' },
  { label: 'Orange', value: '3' },
];
const opts3 = [
  { text: 'Apple', id: '1' },
  { text: 'Pear', id: '2' },
  { text: 'Orange', id: '3' },
];

const CheckboxDemo = (props: PriviewProps) => {
  const [checkedList, setCheckedList] = React.useState<string[]>([]);
  const len = checkedList.length;
  const onChange = React.useCallback((checkedList) => {
    setCheckedList(checkedList);
  }, []);

  const onCheckAllChange = React.useCallback((checked: boolean) => {
    setCheckedList(checked ? [...opts1] : []);
  }, []);

  const renderItem = React.useCallback((item) => {
    return <div style={{ marginLeft: 5, color: 'green' }}>{`${item.label}(${item.value})`}</div>;
  }, []);

  return (
    <DocPreview {...props}>
      <h4>string数组，全选用例</h4>
      <Checkbox
        indeterminate={len ? len < OPT_LEN : false}
        onChange={onCheckAllChange}
        checked={len === OPT_LEN}
      />
      <Split />
      <CheckboxGroup options={opts1} value={checkedList} onChange={onChange} />
      <h4>对象用例</h4>
      <CheckboxGroup options={opts2} />
      <h4>对象用例，指定label, value</h4>
      <CheckboxGroup options={opts3} valueKey="id" labelKey="text" />
      <h4>对象用例，自定义渲染</h4>
      <CheckboxGroup options={opts2} renderItem={renderItem} />
    </DocPreview>
  );
};

export default CheckboxDemo;
