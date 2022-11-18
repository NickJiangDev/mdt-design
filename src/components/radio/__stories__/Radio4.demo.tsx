import { DocPreview, FlexHorAround } from '@/__stories-template__';
import { RadioNav } from '@/components/radio';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const RadioDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <h4>常规</h4>
      <FlexHorAround>
        <RadioNav>常规</RadioNav>
        <RadioNav checked>激活</RadioNav>
      </FlexHorAround>
      <h4>icon</h4>
      <FlexHorAround>
        <RadioNav icon={'chevron-down'}>常规</RadioNav>
        <RadioNav checked icon={'chevron-down'}>
          激活
        </RadioNav>
      </FlexHorAround>
    </DocPreview>
  );
};
export default RadioDemo;
