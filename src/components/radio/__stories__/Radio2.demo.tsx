import { DocPreview, FlexHorAround } from '@/__stories-template__';
import { RadioButton } from '@/components/radio';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const RadioDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <h4>常规</h4>
      <FlexHorAround>
        <RadioButton>常规</RadioButton>
        <RadioButton size="compact">Compact</RadioButton>
        <RadioButton checked>激活</RadioButton>
        <RadioButton checked size="compact">
          激活Compact
        </RadioButton>
        <RadioButton disabled>禁用</RadioButton>
        <RadioButton disabled checked>
          激活禁用
        </RadioButton>
      </FlexHorAround>
      <h4>icon</h4>
      <FlexHorAround>
        <RadioButton onlyIcon={'walker'}>常规</RadioButton>
        <RadioButton checked onlyIcon={'walker'} size="compact">
          常规
        </RadioButton>
        <RadioButton leftIcon="bike">骑行</RadioButton>
        <RadioButton checked leftIcon="bike">
          骑行
        </RadioButton>
        <RadioButton size="compact" leftIcon="car">
          驾车
        </RadioButton>
        <RadioButton checked size="compact" rightIcon="car">
          驾车
        </RadioButton>
      </FlexHorAround>
    </DocPreview>
  );
};
export default RadioDemo;
