import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker, {
  PickerProps,
  PickerDateProps,
  RangePickerProps as BaseRangePickerProps,
} from './generatePicker';
import { TimeFormat, timeFormatValue } from './util';

export type DatePickerProps = PickerProps<Dayjs>;
export type MonthPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'>;
export type WeekPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'>;
export type RangePickerProps = BaseRangePickerProps<Dayjs>;
export { TimeFormat, timeFormatValue };

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

DatePicker.displayName = 'DatePicker';

export * as DatePickerCN from './languages/zh-CN';
export * as DatePickerEN from './languages/en-US';

export default DatePicker;
