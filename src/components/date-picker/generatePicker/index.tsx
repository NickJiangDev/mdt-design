import * as React from 'react';
import { GenerateConfig } from 'rc-picker/lib/generate/index';
import {
  PickerBaseProps as RCPickerBaseProps,
  PickerDateProps as RCPickerDateProps,
  PickerTimeProps as RCPickerTimeProps,
} from 'rc-picker/lib/Picker';
import { SharedTimeProps } from 'rc-picker/lib/panels/TimePanel';
import {
  RangePickerBaseProps as RCRangePickerBaseProps,
  RangePickerDateProps as RCRangePickerDateProps,
  RangePickerTimeProps as RCRangePickerTimeProps,
} from 'rc-picker/lib/RangePicker';
import { PickerMode, Locale as RcPickerLocale } from 'rc-picker/lib/interface';
import PickerButton from '../PickerButton';
import PickerTag from '../PickerTag';
import generateSinglePicker from './generateSinglePicker';
import generateRangePicker from './generateRangePicker';
import { TimeFormat } from '../util';
import { ButtonProps } from '@/components/button';

export const PickerComponents = (btnProps?: ButtonProps) => {
  return {
    button: (props: ButtonProps) => {
      // 单独处理的事件
      const { onClick } = props;
      const _onClick = (e: React.MouseEvent) => {
        onClick?.(e);
        btnProps?.onClick?.(e);
      };
      return PickerButton({ ...props, ...btnProps, onClick: _onClick });
    },
    rangeItem: PickerTag,
  };
};

function toArray<T>(list: T | T[]): T[] {
  if (!list) {
    return [];
  }
  return Array.isArray(list) ? list : [list];
}

export function getTimeProps<DateType>(
  props: { format?: string; picker?: PickerMode } & SharedTimeProps<DateType>,
) {
  const { format, picker, showHour, showMinute, showSecond, use12Hours } = props;

  const firstFormat = toArray(format)[0];
  const showTimeObj: SharedTimeProps<DateType> = { ...props };

  if (firstFormat) {
    if (!firstFormat.includes('s') && showSecond === undefined) {
      showTimeObj.showSecond = false;
    }
    if (!firstFormat.includes('m') && showMinute === undefined) {
      showTimeObj.showMinute = false;
    }
    if (!firstFormat.includes('H') && !firstFormat.includes('h') && showHour === undefined) {
      showTimeObj.showHour = false;
    }

    if ((firstFormat.includes('a') || firstFormat.includes('A')) && use12Hours === undefined) {
      showTimeObj.use12Hours = true;
    }
  }

  if (picker === 'time') {
    return showTimeObj;
  }

  return {
    showTime: showTimeObj,
  };
}

type InjectDefaultProps<Props, DateType> = Omit<
  Props,
  | 'locale'
  | 'generateConfig'
  | 'prevIcon'
  | 'nextIcon'
  | 'superPrevIcon'
  | 'superNextIcon'
  | 'hideHeader'
  | 'components'
  | 'onChange'
  | 'onSelect'
> & {
  locale?: PickerLocale;
  bordered?: boolean;
  type?: 'assist-bg';
  size?: 'compact';
  initialTimeFormat?: TimeFormat; // mode=date时的初始值
  timeFormat?: TimeFormat;
  onChange?: (value: DateType | null, dateString: string, timeFormat?: TimeFormat) => void;
  onSelect?: (value: DateType | null, timeFormat?: TimeFormat) => void;
  onFormatChange?: (timeFormat: TimeFormat) => void;
};

export interface TimePickerLocale {
  placeholder?: string;
  rangePlaceholder?: [string, string];
}

export type PickerLocale = {
  lang: RcPickerLocale & AdditionalPickerLocaleLangProps;
  timePickerLocale: TimePickerLocale;
} & AdditionalPickerLocaleProps;

export type AdditionalPickerLocaleProps = {
  dateFormat?: string;
  dateTimeFormat?: string;
  weekFormat?: string;
  monthFormat?: string;
};

export type AdditionalPickerLocaleLangProps = {
  TimeFormatYMD: string;
  TimeFormatYMDHm: string;
  TimeFormatYMDHmS: string;
  placeholder: string;
  yearPlaceholder?: string;
  quarterPlaceholder?: string;
  monthPlaceholder?: string;
  weekPlaceholder?: string;
  rangeYearPlaceholder?: [string, string];
  rangeMonthPlaceholder?: [string, string];
  rangeWeekPlaceholder?: [string, string];
  rangePlaceholder?: [string, string];
};

// Picker Props
export type PickerBaseProps<DateType> = InjectDefaultProps<RCPickerBaseProps<DateType>, DateType>;
export type PickerDateProps<DateType> = InjectDefaultProps<RCPickerDateProps<DateType>, DateType>;
export type PickerTimeProps<DateType> = InjectDefaultProps<RCPickerTimeProps<DateType>, DateType>;

export type PickerProps<DateType> =
  | PickerBaseProps<DateType>
  | PickerDateProps<DateType>
  | PickerTimeProps<DateType>;

// Range Picker Props
export type RangePickerBaseProps<DateType> = InjectDefaultProps<
  RCRangePickerBaseProps<DateType>,
  DateType
>;
export type RangePickerDateProps<DateType> = InjectDefaultProps<
  RCRangePickerDateProps<DateType>,
  DateType
>;
export type RangePickerTimeProps<DateType> = InjectDefaultProps<
  RCRangePickerTimeProps<DateType>,
  DateType
>;

export type RangePickerProps<DateType> =
  | RangePickerBaseProps<DateType>
  | RangePickerDateProps<DateType>
  | RangePickerTimeProps<DateType>;

function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
  // =========================== Picker ===========================
  const { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker } = generateSinglePicker(
    generateConfig,
  );

  // ======================== Range Picker ========================
  const RangePicker = generateRangePicker(generateConfig);

  // =========================== Export ===========================
  type MergedDatePickerType = typeof DatePicker & {
    WeekPicker: typeof WeekPicker;
    MonthPicker: typeof MonthPicker;
    YearPicker: typeof YearPicker;
    RangePicker: React.ComponentClass<RangePickerProps<DateType>>;
    TimePicker: typeof TimePicker;
  };

  const MergedDatePicker = DatePicker as MergedDatePickerType;
  MergedDatePicker.WeekPicker = WeekPicker;
  MergedDatePicker.MonthPicker = MonthPicker;
  MergedDatePicker.YearPicker = YearPicker;
  MergedDatePicker.RangePicker = RangePicker;
  MergedDatePicker.TimePicker = TimePicker;

  return MergedDatePicker;
}

export default generatePicker;
