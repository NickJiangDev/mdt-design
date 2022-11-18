import { DocPreview, FlexHorAround } from '@/__stories-template__';
import Dropzone from '@/components/dropzone';
import { PriviewProps } from '@/__stories-template__/DocPreview';

export default (props: PriviewProps) => (
  <DocPreview {...props}>
    <FlexHorAround>
      <div>
        <h2>default</h2>
        <Dropzone />
      </div>
      <div>
        <h2>accept</h2>
        <Dropzone accept={'image/*,.pdf'} />
      </div>
    </FlexHorAround>
    <br />
    <FlexHorAround>
      <div>
        <h2>disabled tip</h2>
        <Dropzone disabled tip={'点击或拖拽文件到此区域'} desc={'支持zip, rar, py格式文件'} />
      </div>
      <div>
        <h2>tip</h2>
        <Dropzone
          size={'compact'}
          accept={'.pdf'}
          tip={'点击或拖拽文件到此区域'}
          desc={'支持zip, rar, py格式文件支持zip, rar, py格式文件支持'}
          onDropAccepted={(files) => console.log(files)}
        />
      </div>
    </FlexHorAround>
  </DocPreview>
);
