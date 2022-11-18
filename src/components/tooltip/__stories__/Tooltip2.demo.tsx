import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';
import TooltipText from '../TooltipText';

const TooltipDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <div style={{ width: 300, border: '1px dashed red' }}>
        <h4>标准:</h4>
        <TooltipText text="我是Tooltip" />
        <h4>宽度不够， tooltip补充:</h4>
        <TooltipText text="我是Tooltip我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长我很长" />
      </div>
    </DocPreview>
  );
};

export default TooltipDemo;
