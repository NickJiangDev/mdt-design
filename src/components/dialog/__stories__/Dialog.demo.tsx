import * as React from 'react';
import Button from '@/components/button';
import Dialog from '@/components/dialog';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const DialogDemo = (props: PriviewProps) => {
  const [open, setOpen] = React.useState(false);
  const onClose1 = () => {
    setOpen(false);
  };

  return (
    <DocPreview {...props}>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        组件调用
      </Button>
      <Dialog
        visible={open}
        title={'面板名称'}
        centered
        okText={'确定'}
        cancelText={'取消'}
        onCancel={onClose1}
        onOk={onClose1}
      >
        <p>11111</p>
      </Dialog>
    </DocPreview>
  );
};

export default DialogDemo;
