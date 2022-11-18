import { ObjectInterface } from '@/components/_utils/interfaces';
import PreviewList from '@/components/preview-list';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const list: ObjectInterface[] = [];
for (let i = 0; i < 10000; i++) {
  list.push({ id: `${i}`, label: `组件${i}` });
}

const RenderCell = (props: ObjectInterface) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      {props.item.label}
    </div>
  );
};

const RenderPreview = (props: ObjectInterface) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      {props.item.label}
    </div>
  );
};

const PreviewListDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <div className="demo" style={{ width: 600, height: 500 }}>
        <PreviewList list={list} RenderCell={RenderCell} RenderPreview={RenderPreview} />
      </div>
    </DocPreview>
  );
};
export default PreviewListDemo;
