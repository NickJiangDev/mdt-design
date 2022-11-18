import * as React from 'react';
import { DateFilter } from '@/components/create-filter';
import Button from '@/components/button/Button';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const DateFilter1Demo = (props: PriviewProps) => {
  const [res, setRes] = React.useState({});
  const onOk = React.useCallback((val) => {
    console.info('----', val);
    setRes(val);
  }, []);

  return (
    <DocPreview {...props}>
      <DateFilter value={res} loading={false} onOk={onOk}>
        <Button>open</Button>
      </DateFilter>
    </DocPreview>
  );
};
export default DateFilter1Demo;
