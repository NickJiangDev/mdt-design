import Progress from '@/components/progress';
import toast from '@/components/toast';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const ProgressDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <h4>基本用法</h4>
      <Progress percent={50} />
      <Progress percent={50} type="error" />
      <Progress percent={50} type="success" />
      <Progress percent={50} type="warning" />
      <h4>显示percent</h4>
      <Progress percent={100} showPercent={true} />
      <h4>显示cancel按钮</h4>
      <Progress
        percent={30}
        cancelable={true}
        onCancel={() => {
          toast.error('cancel');
        }}
      />
      <Progress
        percent={30}
        type="error"
        showPercent={true}
        cancelable={true}
        onCancel={() => {
          toast.error('cancel');
        }}
      />
      <h4>显示标题等</h4>
      <Progress percent={30} type="success" title="标题内容" showPercent={true} />
      <Progress
        percent={30}
        type="warning"
        title="标题内容"
        showPercent={true}
        cancelable={true}
        onCancel={() => {
          toast.error('cancel');
        }}
      />
    </DocPreview>
  );
};

export default ProgressDemo;
