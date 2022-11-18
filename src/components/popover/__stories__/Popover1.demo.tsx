import Button from '@/components/button';
import Popover from '@/components/popover';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const buttonWidth = 70;
const text = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const PopoverDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <div className="demo" style={{ paddingLeft: 300 }}>
        <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
          <Popover placement="topLeft" content={content} trigger="click">
            <Button>TL</Button>
          </Popover>
          <Popover placement="top" content={content} trigger="click">
            <Button>Top</Button>
          </Popover>
          <Popover placement="topRight" content={content} trigger="click">
            <Button>TR</Button>
          </Popover>
        </div>
        <div style={{ width: buttonWidth, float: 'left' }}>
          <Popover placement="leftTop" content={content} trigger="click">
            <Button>LT</Button>
          </Popover>
          <Popover placement="left" content={content} trigger="click">
            <Button>Left</Button>
          </Popover>
          <Popover placement="leftBottom" content={content} trigger="click">
            <Button>LB</Button>
          </Popover>
        </div>
        <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
          <Popover placement="rightTop" content={content} trigger="click">
            <Button>RT</Button>
          </Popover>
          <Popover placement="right" title={text} content={content} trigger="click">
            <Button>Right</Button>
          </Popover>
          <Popover placement="rightBottom" title={text} content={content} trigger="click">
            <Button>RB</Button>
          </Popover>
        </div>
        <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
          <Popover placement="bottomLeft" title={text} content={content} trigger="click">
            <Button>BL</Button>
          </Popover>
          <Popover placement="bottom" title={text} content={content} trigger="click">
            <Button>Bottom</Button>
          </Popover>
          <Popover placement="bottomRight" title={text} content={content} trigger="click">
            <Button>BR</Button>
          </Popover>
        </div>
      </div>
    </DocPreview>
  );
};
export default PopoverDemo;
