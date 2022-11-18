import Dropdown from '@/components/dropdown';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const DropdownDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <Dropdown overlay={<div>11111</div>}>
        <div>open</div>
      </Dropdown>
    </DocPreview>
  );
};

export default DropdownDemo;
