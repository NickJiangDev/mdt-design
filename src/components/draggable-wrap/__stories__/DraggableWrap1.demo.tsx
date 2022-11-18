import { DraggableContainer, DocPreview } from '@/__stories-template__';
import DraggableWrap from '@/components/draggable-wrap';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const DraggableWrap1Demo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <DraggableWrap>
        <DraggableContainer />
      </DraggableWrap>
    </DocPreview>
  );
};
export default DraggableWrap1Demo;
