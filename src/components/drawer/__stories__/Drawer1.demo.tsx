import * as React from 'react';
import Button from '@/components/button';
import Drawer from '@/components/drawer';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const DrawerDemo = (props: PriviewProps) => {
  const [open, setOpen] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  return (
    <DocPreview {...props}>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        组件调用
      </Button>
      <Button
        onClick={() => {
          setOpen3(true);
        }}
      >
        组件调用底部弹出
      </Button>
      <Drawer
        level={null}
        handler={false}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        width={'80vw'}
      />
      <Drawer
        level={null}
        handler={false}
        open={open3}
        onClose={() => {
          setOpen3(false);
        }}
        placement="bottom"
        height={'30vh'}
      />
    </DocPreview>
  );
};
export default DrawerDemo;
