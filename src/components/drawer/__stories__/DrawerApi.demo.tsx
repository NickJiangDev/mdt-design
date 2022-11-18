import Button from '@/components/button';
import drawerApi from '../drawerApi';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const DrawerDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <Button
        onClick={() => {
          drawerApi.open(
            (onClose) => {
              return <Button onClick={onClose}>关闭</Button>;
            },
            { width: '80vw' },
          );
        }}
      >
        函数调用
      </Button>
      <Button
        onClick={() => {
          drawerApi.open(
            (onClose) => {
              return <Button onClick={onClose}>关闭</Button>;
            },
            { width: '80vw' },
            true,
          );
        }}
      >
        函数调用(可拖拽)
      </Button>
    </DocPreview>
  );
};
export default DrawerDemo;
