import { CreateFilter } from '@/components/create-filter';
import Button from '@/components/button/Button';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const CreateFilter1Demo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <CreateFilter loading={true}>
        <Button>open</Button>
      </CreateFilter>

      <CreateFilter clickAway>
        <Button>open</Button>
      </CreateFilter>

      <h4>失效状态</h4>
      <CreateFilter disabled>
        <Button disabled>open</Button>
      </CreateFilter>
    </DocPreview>
  );
};
export default CreateFilter1Demo;
