import * as React from 'react';
import { RadioGroup } from '@/components/radio';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const options = ['橘子', '橙子', '苹果', '香蕉', '火龙果'];
const opt2 = [
  { label: '步行', value: 'walker', onlyIcon: 'walker' },
  { label: '骑行', value: 'bike', onlyIcon: 'bike' },
  { label: '驾车', value: 'car', onlyIcon: 'car' },
];
const opt3 = [
  { label: '步行', value: 'walker', leftIcon: 'walker', disabled: true },
  { label: '骑行', value: 'bike', leftIcon: 'bike' },
  { label: '驾车', value: 'car', leftIcon: 'car' },
];
const opt4 = [
  { label: '步行', value: 'walker', leftIcon: 'walker', icon: 'chevron-down' },
  { label: '骑行', value: 'bike', leftIcon: 'bike' },
  { label: '驾车', value: 'car', leftIcon: 'car' },
];
const RadioDemo = (props: PriviewProps) => {
  const [value1, setValue1] = React.useState('苹果');

  const handleRadioChange1 = React.useCallback((value) => {
    setValue1(value);
  }, []);

  return (
    <DocPreview {...props}>
      <h4>radio</h4>
      <RadioGroup onChange={handleRadioChange1} value={value1} options={options} />
      <h4>radio button</h4>
      <RadioGroup
        radioType={'button'}
        onChange={handleRadioChange1}
        value={value1}
        options={options}
      />
      <h4>radio button only icon</h4>
      <RadioGroup radioType={'button'} defaultValue={'walker'} options={opt2} />
      <h4>radio button left icon</h4>
      <RadioGroup radioType={'button'} defaultValue={'bike'} options={opt3} />
      <h4>radio button left icon compact</h4>
      <RadioGroup radioType={'button'} defaultValue={'bike'} options={opt4} size={'compact'} />
      <h4>radio nav</h4>
      <RadioGroup radioType={'nav'} defaultValue={'bike'} options={opt4} />
    </DocPreview>
  );
};
export default RadioDemo;
