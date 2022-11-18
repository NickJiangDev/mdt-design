import Button from '@/components/button';
import Popconfirm from '@/components/popconfirm';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const buttonWidth = 70;

const PopoverDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <div className="demo" style={{ paddingLeft: 300 }}>
        <Popconfirm message="Are you sure delete this task?" okText="Yes" cancelText="No" disabled>
          <div>Delete a task</div>
        </Popconfirm>
        <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
          <Popconfirm
            placement="topLeft"
            okText={'确定'}
            cancelText={'取消'}
            message={'主标题'}
            trigger="click"
            emotion={'info'}
          >
            <Button>TL</Button>
          </Popconfirm>
          <Popconfirm
            placement="top"
            okText={'确定'}
            cancelText={'取消'}
            message={'确定删除数据'}
            description={'删除无法复原，请谨慎操作'}
            trigger="click"
            emotion={'help-2'}
          >
            <Button>Top</Button>
          </Popconfirm>
          <Popconfirm
            placement="topRight"
            okText={'确定'}
            cancelText={'取消'}
            message={'确定删除数据'}
            description={'删除无法复原，请谨慎操作'}
            trigger="click"
            emotion={'help-2'}
          >
            <Button>TR</Button>
          </Popconfirm>
        </div>
        <div style={{ width: buttonWidth, float: 'left' }}>
          <Popconfirm
            placement="leftTop"
            okText={'确定'}
            cancelText={'取消'}
            message={'确定删除数据'}
            description={'删除无法复原，请谨慎操作'}
            trigger="click"
            emotion={'help-2'}
          >
            <Button>LT</Button>
          </Popconfirm>
          <Popconfirm
            placement="left"
            okText={'确定'}
            cancelText={'取消'}
            message={'确定删除数据'}
            description={'删除无法复原，请谨慎操作'}
            trigger="click"
            emotion={'help-2'}
          >
            <Button>Left</Button>
          </Popconfirm>
          <Popconfirm
            placement="leftBottom"
            okText={'确定'}
            cancelText={'取消'}
            message={'确定删除数据'}
            description={'删除无法复原，请谨慎操作'}
            trigger="click"
            emotion={'help-2'}
          >
            <Button>LB</Button>
          </Popconfirm>
        </div>
        <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
          <Popconfirm
            placement="rightTop"
            okText={'确定'}
            cancelText={'取消'}
            message={'确定删除数据'}
            description={'删除无法复原，请谨慎操作'}
            trigger="click"
            emotion={'help-2'}
          >
            <Button>RT</Button>
          </Popconfirm>
          <Popconfirm
            placement="right"
            okText={'确定'}
            cancelText={'取消'}
            message={'确定删除数据'}
            trigger="click"
          >
            <Button>Right</Button>
          </Popconfirm>
          <Popconfirm
            placement="rightBottom"
            okText={'确定'}
            cancelText={'取消'}
            message={'确定删除数据'}
            trigger="click"
          >
            <Button>RB</Button>
          </Popconfirm>
        </div>
        <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
          <Popconfirm
            placement="bottomLeft"
            okText={'确定'}
            cancelText={'取消'}
            message={'确定删除数据'}
            trigger="click"
          >
            <Button>BL</Button>
          </Popconfirm>
          <Popconfirm
            placement="bottom"
            okText={'确定'}
            cancelText={'取消'}
            message={'确定删除数据'}
            description={'删除无法复原，请谨慎操作'}
            trigger="click"
          >
            <Button>Bottom</Button>
          </Popconfirm>
          <Popconfirm
            placement="bottomRight"
            okText={'确定'}
            cancelText={'取消'}
            message={'确定删除数据'}
            description={'删除无法复原，请谨慎操作'}
            trigger="click"
          >
            <Button>BR</Button>
          </Popconfirm>
        </div>
      </div>
    </DocPreview>
  );
};
export default PopoverDemo;
