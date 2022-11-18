import { DocPreview, FlexHorAround } from '@/__stories-template__';
import { ToastContainer } from '@/components/toast';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const ToastDemo = (props: PriviewProps) => (
  <DocPreview {...props}>
    <FlexHorAround>
      <div>
        <h4>success</h4>
        <ToastContainer
          type="success"
          message="“数据包-1上传成功上传成功上传成功上传成功上传成功上传成功上传成功上传成功上传成功上传成功” 上传成功"
          withClose
        />
      </div>
      <div>
        <h4>error</h4>
        <ToastContainer type="error" message="“数据包-1” 上传失败" withClose />
      </div>
      <div>
        <h4>warning</h4>
        <ToastContainer type="warning" message="“数据包-1” 上传出现问题" withClose />
      </div>
      <div>
        <h4>info</h4>
        <ToastContainer type="info" message="“数据包-1” 上传出现问题" withClose />
      </div>
    </FlexHorAround>
    <FlexHorAround>
      <div>
        <h4>success</h4>
        <ToastContainer type="success" message="“数据包-1” 上传成功" buttonText="查看" />
      </div>
      <div>
        <h4>error</h4>
        <ToastContainer
          type="error"
          message="“数据包-1” 上传失败上传失败上传上传失败上传失败失败上传失败"
          buttonText="查看"
        />
      </div>
    </FlexHorAround>
    <FlexHorAround>
      <div>
        <h4>warning</h4>
        <ToastContainer
          type="warning"
          message="“数据包-1” 上传出现问题"
          buttonText="查看"
          withArrow
        />
      </div>
      <div>
        <h4>info</h4>
        <ToastContainer type="info" message="“数据包-1” 上传出现问题" buttonText="查看" withArrow />
      </div>
    </FlexHorAround>
  </DocPreview>
);
export default ToastDemo;
