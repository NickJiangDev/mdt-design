import TimePicker from '@/components/time-picker';
import dayjs, { Dayjs } from 'dayjs';

function onChange(time: Dayjs | null, timeString: string) {
  console.log(time, timeString);
}

const format = 'HH:mm';
const TimePickerDemo = () => {
  return (
    <div>
      <TimePicker
        onChange={onChange}
        format={format}
        defaultOpenValue={dayjs('00:00', format)}
        size={'compact'}
        type={'assist-bg'}
      />
    </div>
  );
};

export default TimePickerDemo;
