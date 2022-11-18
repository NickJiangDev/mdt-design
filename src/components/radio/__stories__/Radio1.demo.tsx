import * as React from 'react';
import { DocPreview, FlexHorAround } from '@/__stories-template__';
import Radio from '@/components/radio';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const RadioDemo = (props: PriviewProps) => {
  const [checked, setChecked] = React.useState<string>();

  return (
    <DocPreview {...props}>
      <h4>未选中</h4>
      <FlexHorAround>
        <Radio />
        <Radio disabled />
        <Radio size="compact" />
        <Radio size="compact" disabled />
      </FlexHorAround>
      <h4>选中</h4>
      <FlexHorAround>
        <Radio checked={true} />
        <Radio checked disabled />
        <Radio checked={true} size="compact" />
        <Radio checked={true} size="compact" disabled />
      </FlexHorAround>
      <h4>onchange</h4>
      <FlexHorAround>
        <Radio checked={checked === '1'} value="1" onChange={setChecked} />
        <Radio>苹果</Radio>
        <Radio disabled>苹果</Radio>
        <Radio checked={true}>苹果</Radio>
        <Radio checked={true}>苹果</Radio>
      </FlexHorAround>
    </DocPreview>
  );
};
export default RadioDemo;
