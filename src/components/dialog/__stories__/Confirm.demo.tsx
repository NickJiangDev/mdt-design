import * as React from 'react';
import Button from '@/components/button';
import { Confirm } from '@/components/dialog';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const DialogDemo = (props: PriviewProps) => {
  const [open3, setOpen3] = React.useState(false);
  const onClose3 = () => {
    setOpen3(false);
  };

  return (
    <DocPreview {...props}>
      <Button
        onClick={() => {
          setOpen3(true);
        }}
      >
        组件调用
      </Button>
      <Confirm
        visible={open3}
        title={'请填写地图可视化名称'}
        description={'地图可视化名称'}
        errorMessage="报错信息......"
        okText={'确定'}
        cancelText={'取消'}
        onOk={onClose3}
        onCancel={onClose3}
      />
    </DocPreview>
  );
};

export default DialogDemo;
