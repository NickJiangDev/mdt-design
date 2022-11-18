import * as React from 'react';
import Spin from '@/components/spin';
import Toggle from '@/components/toggle';
import TextAlert from '@/components/text-alert';
import { DocPreview, FlexHorAround } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const SpinDemo = (props: PriviewProps) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <DocPreview {...props}>
      <FlexHorAround>
        <div>
          <h4>普通</h4>
          <Spin />
        </div>
        <div>
          <h4>大</h4>
          <Spin size={'large'} />
        </div>
        <div>
          <h4>小</h4>
          <Spin size={'small'} />
        </div>
      </FlexHorAround>
      <h4>容器中</h4>
      <Spin tip={'加载中...'}>
        <TextAlert
          message={'Info text'}
          type={'solid'}
          description={'info info info info info info info info info info info info'}
        />
      </Spin>
      <h4>延迟显示 loading 效果。当 spinning 状态在 delay 时间内结束，则不显示 loading 状态</h4>
      快速点击
      <Toggle checked={checked} onChange={(val) => setChecked(val)} />
      <br />
      <Spin tip={'加载中...'} spinning={checked} delay={500}>
        <TextAlert
          message={'Info text'}
          type={'solid'}
          description={'info info info info info info info info info info info info'}
        />
      </Spin>
    </DocPreview>
  );
};
export default SpinDemo;
