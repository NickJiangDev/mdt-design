import { DocPreview, FlexHorAround } from '@/__stories-template__';
import Dot from '@/components/dot';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const DotDemo = (props: PriviewProps) => (
  <DocPreview {...props}>
    <h2>常规</h2>
    <FlexHorAround>
      <Dot />
      <Dot status={'warning'} />
      <Dot status={'error'} />
      <Dot status={'success'} />
      <Dot status={'canceled'} />
    </FlexHorAround>
    <br />
    <h2>带文字状态</h2>
    <FlexHorAround>
      <Dot text={'运行中'} />
      <Dot status={'warning'} text={'运行暂停'} />
      <Dot status={'error'} text={'运行失败'} />
      <Dot status={'success'} text={'运行成功'} />
      <Dot status={'canceled'} text={'取消运行'} />
    </FlexHorAround>
  </DocPreview>
);
export default DotDemo;
