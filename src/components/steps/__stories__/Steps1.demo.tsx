import React from 'react';
import { DocPreview, FlexHorAround } from '@/__stories-template__';
import Steps, { Step } from '@/components/steps';
import Button from '@/components/button';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const description =
  '这里是步骤描述这里是步骤描述这里是步骤描述这里是步骤描述这里是步骤描述这里是步骤描述这里是步骤描述这里是步骤描述';

const StepsDemo = (props: PriviewProps) => {
  const [current, setCurrent] = React.useState(0);
  const onChange = React.useCallback((index: number) => {
    setCurrent(index);
  }, []);
  const nextStep = () => {
    setCurrent((current + 1) % 4);
  };
  return (
    <DocPreview {...props}>
      <h4>default</h4>
      <Steps style={{ marginBottom: 10 }} current={2}>
        <Step title="步骤1" />
        <Step title="步骤2" />
        <Step title="步骤3" />
        <Step title="步骤4" />
      </Steps>
      <Steps style={{ marginBottom: 10 }} current={1}>
        <Step title="步骤1" subTitle="添加成功" description={description} />
        <Step title="步骤2" subTitle="验证失败" description={description} />
        <Step title="步骤3" subTitle="处理中,剩余 7s" description={description} />
        <Step title="步骤4" subTitle="请先执行上一步" description={description} />
      </Steps>
      <Steps style={{ marginBottom: 10 }} current={3} size="small">
        <Step title="步骤1" />
        <Step title="步骤2" />
        <Step title="步骤3" />
        <Step title="步骤4" />
      </Steps>
      <h4>label-vertical</h4>
      <Steps style={{ marginBottom: 10 }} current={2} labelPlacement="vertical">
        <Step title="步骤1" subTitle="添加成功" description={description} />
        <Step title="步骤2" subTitle="验证失败" description={description} />
        <Step title="步骤3" subTitle="处理中,剩余 7s" description={description} />
        <Step title="步骤4" subTitle="请先执行上一步" description={description} />
      </Steps>
      <h4>设置onChange可点击切换</h4>
      <Steps style={{ marginBottom: 10 }} current={current} onChange={onChange}>
        <Step title="步骤1" />
        <Step title="步骤2" />
        <Step title="步骤3" />
        <Step title="步骤4" />
      </Steps>
      <Button type="primary" onClick={nextStep}>
        下一步
      </Button>
      <h4>步骤状态</h4>
      <Steps style={{ marginBottom: 10 }} current={3}>
        <Step title="步骤1" status="finish" subTitle="添加成功" description={description} />
        <Step title="步骤2" status="error" subTitle="验证失败" description={description} />
        <Step title="步骤3" status="process" subTitle="处理中,剩余 7s" description={description} />
        <Step title="步骤4" status="wait" subTitle="请先执行上一步" description={description} />
      </Steps>
      <h4>导航</h4>
      <Steps style={{ marginBottom: 10 }} current={3} type="navigation" size="small">
        <Step title="步骤1" status="error" description={description} />
        <Step title="步骤2" status="finish" description={description} />
        <Step title="步骤3" />
        <Step title="步骤4" />
        <Step title="步骤5" />
      </Steps>
      <h4>垂直方向</h4>
      <FlexHorAround>
        <Steps direction="vertical" current={current} onChange={onChange}>
          <Step title="步骤1" description={description} />
          <Step title="步骤2" description={description} />
          <Step title="步骤3" description={description} />
          <Step title="步骤4" description={description} />
        </Steps>
      </FlexHorAround>
    </DocPreview>
  );
};

export default StepsDemo;
