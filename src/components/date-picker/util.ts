import { PickerMode } from 'rc-picker/lib/interface';
import { PickerLocale } from './generatePicker';

export const prefixCls = 'dmc-date-picker';

export function getPlaceholder(
  picker: PickerMode | undefined,
  locale: PickerLocale,
  customizePlaceholder?: string,
): string {
  if (customizePlaceholder !== undefined) {
    return customizePlaceholder;
  }

  if (picker === 'year' && locale.lang.yearPlaceholder) {
    return locale.lang.yearPlaceholder;
  }
  if (picker === 'quarter' && locale.lang.quarterPlaceholder) {
    return locale.lang.quarterPlaceholder;
  }
  if (picker === 'month' && locale.lang.monthPlaceholder) {
    return locale.lang.monthPlaceholder;
  }
  if (picker === 'week' && locale.lang.weekPlaceholder) {
    return locale.lang.weekPlaceholder;
  }
  if (picker === 'time' && locale.timePickerLocale.placeholder) {
    return locale.timePickerLocale.placeholder;
  }
  return locale.lang.placeholder;
}

export function getRangePlaceholder(
  picker: PickerMode | undefined,
  locale: PickerLocale,
  customizePlaceholder?: [string, string],
) {
  if (customizePlaceholder !== undefined) {
    return customizePlaceholder;
  }

  if (picker === 'year' && locale.lang.yearPlaceholder) {
    return locale.lang.rangeYearPlaceholder;
  }
  if (picker === 'month' && locale.lang.monthPlaceholder) {
    return locale.lang.rangeMonthPlaceholder;
  }
  if (picker === 'week' && locale.lang.weekPlaceholder) {
    return locale.lang.rangeWeekPlaceholder;
  }
  if (picker === 'time' && locale.timePickerLocale.placeholder) {
    return locale.timePickerLocale.rangePlaceholder;
  }
  return locale.lang.rangePlaceholder;
}

export enum TimeFormat {
  no = 'no',
  h = 'h',
  hm = 'hm',
  hms = 'hms',
}
export function getTimeFormatPlaceholder(val: TimeFormat, locale: PickerLocale) {
  if (val === TimeFormat.hms) {
    return locale.lang.TimeFormatYMDHmS;
  }
  if (val === TimeFormat.hm) {
    return locale.lang.TimeFormatYMDHm;
  }
  return locale.lang.TimeFormatYMD;
}

export function timeFormatValue(f?: TimeFormat) {
  const NO_DATE_FORMATTER = 'YYYY-MM-DD';
  const H_DATE_FORMATTER = 'YYYY-MM-DD HH';
  const HM_DATE_FORMATTER = 'YYYY-MM-DD HH:mm';
  const HMS_DATE_FORMATTER = 'YYYY-MM-DD HH:mm:ss';
  if (!f || f === TimeFormat.no) {
    return NO_DATE_FORMATTER;
  }
  if (f === TimeFormat.hm) {
    return HM_DATE_FORMATTER;
  }
  if (f === TimeFormat.hms) {
    return HMS_DATE_FORMATTER;
  }
  if (f === TimeFormat.h) {
    return H_DATE_FORMATTER;
  }
}
export interface PickerRefConfig {
  focus: () => void;
  blur: () => void;
}
