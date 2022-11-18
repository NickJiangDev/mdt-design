import * as React from 'react';
import TimePicker from '@/components/time-picker';
import dayjs, { Dayjs } from 'dayjs';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const TimePickerDemo = (props: PriviewProps) => {
  const onChange = React.useCallback((time: Dayjs | null, timeString: string) => {
    console.log(time, timeString);
  }, []);
  return (
    <DocPreview {...props}>
      <TimePicker onChange={onChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
    </DocPreview>
  );
};

export default TimePickerDemo;
