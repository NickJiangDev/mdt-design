import * as React from 'react';
import Button from '@/components/button';
import { DragDrawer } from '@/components/drawer';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const DrawerDemo = (props: PriviewProps) => {
  const [open2, setOpen2] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

  return (
    <DocPreview {...props}>
      <Button
        onClick={() => {
          setOpen2(true);
        }}
      >
        组件调用(可拖拽)
      </Button>
      <Button
        onClick={() => {
          setOpen4(true);
        }}
      >
        组件调用(可拖拽)底部弹出
      </Button>
      <DragDrawer
        level={null}
        handler={false}
        open={open2}
        onClose={() => {
          setOpen2(false);
        }}
        defaultSize={'80%'}
      />
      <DragDrawer
        level={null}
        handler={false}
        open={open4}
        onClose={() => {
          setOpen4(false);
        }}
        defaultSize={'30%'}
        placement="bottom"
      />
    </DocPreview>
  );
};
export default DrawerDemo;
