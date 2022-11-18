import { DocPreview, FlexHorAround } from '@/__stories-template__';
import Button from '@/components/button';
import toast from '@/components/toast';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const ToastDemo = (props: PriviewProps) => (
  <DocPreview {...props}>
    <FlexHorAround>
      <Button onClick={() => toast.success('上传成功')}>success</Button>
      <Button onClick={() => toast.error('上传成功')}>error</Button>
      <Button onClick={() => toast.warning('上传成功')}>warning</Button>
      <Button onClick={() => toast.info('上传成功')}>info</Button>
    </FlexHorAround>
  </DocPreview>
);
export default ToastDemo;
