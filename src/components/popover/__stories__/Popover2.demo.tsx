import { PopoverButton } from '@/components/popover';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const PopoverDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <div className="demo" style={{ paddingLeft: 300 }}>
        <PopoverButton
          content={<p>1111</p>}
          buttonText={'新建'}
          buttonProps={{ type: 'primary' }}
        />
      </div>
    </DocPreview>
  );
};
export default PopoverDemo;
