import { DocPreview, FlexHorAround } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';
import Slider from '../Slider';

const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50',
    },
    label: <strong>100°C</strong>,
  },
};

const style = {
  display: 'inline-block',
  height: 300,
  marginLeft: 70,
};

const SliderDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <h4>基本用法</h4>
      <Slider defaultValue={30} disabled={true} />

      <h4>基本用法 range</h4>
      <Slider range defaultValue={[20, 50]} disabled />

      <h4>included=true</h4>
      <Slider marks={marks} defaultValue={37} />

      <h4>included=true range</h4>
      <Slider range marks={marks} defaultValue={[26, 37]} />

      <h4>included=false</h4>
      <Slider marks={marks} included={false} defaultValue={37} />

      <h4>marks & step</h4>
      <Slider marks={marks} step={10} defaultValue={37} />

      <h4>step=null</h4>
      <Slider marks={marks} step={null} defaultValue={37} />

      <h2>垂直</h2>
      <FlexHorAround>
        <div style={style}>
          <Slider vertical defaultValue={30} />
        </div>
        <div style={style}>
          <Slider vertical range step={10} defaultValue={[20, 50]} />
        </div>
        <div style={style}>
          <Slider vertical range marks={marks} defaultValue={[26, 37]} />
        </div>
      </FlexHorAround>
    </DocPreview>
  );
};

export default SliderDemo;
