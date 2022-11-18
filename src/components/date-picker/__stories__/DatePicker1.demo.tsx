import DatePicker from '@/components/date-picker';
import { Dayjs } from 'dayjs';
import { DocPreview, FlexHorAround } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';
import { TimeFormat } from '../util';

const RangePicker = DatePicker.RangePicker;

function onChange(value: Dayjs | null, dateString: string) {
  console.log(value, dateString);
}

const DatePickerDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <FlexHorAround>
        <div style={{ width: 100 }}>默认</div>
        <DatePicker onChange={onChange} picker={'date'} />
      </FlexHorAround>
      <br />
      <FlexHorAround>
        <div style={{ width: 100 }}>按周选择</div>
        <DatePicker onChange={onChange} picker="week" />
      </FlexHorAround>
      <br />
      <FlexHorAround>
        <div style={{ width: 100 }}>按月选择</div>
        <DatePicker onChange={onChange} picker="month" />
      </FlexHorAround>
      <br />
      <FlexHorAround>
        <div style={{ width: 100 }}>按季度选择</div>
        <DatePicker onChange={onChange} picker="quarter" />
      </FlexHorAround>
      <br />
      <FlexHorAround>
        <div style={{ width: 100 }}>按年选择</div>
        <DatePicker onChange={onChange} picker="year" />
      </FlexHorAround>
      <br />
      <FlexHorAround>
        <div style={{ width: 100 }}>format受控</div>
        <DatePicker onChange={onChange} picker={'date'} timeFormat={TimeFormat.hm} />
      </FlexHorAround>
      <br />
      <FlexHorAround>
        <div style={{ width: 100 }}>范围选择</div>
        <RangePicker />
      </FlexHorAround>
      <br />
      <FlexHorAround>
        <div style={{ width: 100 }}>带时间</div>
        <RangePicker showTime />
      </FlexHorAround>
    </DocPreview>
  );
};

export default DatePickerDemo;
