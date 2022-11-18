import * as React from 'react';
import { NumberFilter, NumberFilterResult } from '@/components/create-filter';
import Button from '@/components/button/Button';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const NumberFilter1Demo = (props: PriviewProps) => {
  const [value, setValue] = React.useState<NumberFilterResult>({ min: 12, max: 121212 });
  const onOk = React.useCallback((v: NumberFilterResult) => {
    setValue(v);
  }, []);

  return (
    <DocPreview {...props}>
      <NumberFilter
        labelMax="最大值"
        labelMin="最小值"
        {...value}
        loading={false}
        onOk={onOk}
        statisticMin={12}
        statisticMax={4444}
      >
        <Button>open</Button>
      </NumberFilter>
    </DocPreview>
  );
};
export default NumberFilter1Demo;
