import { DateUnitKeys, DateUntilKeys, DynamincType, FastTypeKeys, showNature } from './constant';
import dayjs, { Dayjs, UnitType } from 'dayjs';
import { FilterDataProps } from '../index';
import { FilterListValueProps } from '../__private__/FilterList';
import { FilterTypeKeys } from './constant';
import { TimeFormat } from '@/components/create-filter';
import { Locale } from '../languages/zh-CN';
import { OptionsType } from 'rc-select/lib/interface';

export const getDurationOfFastType = (
  fast: string | undefined,
  val: number | undefined = 0,
  type: string,
  unit: DateUnitKeys,
  fastMap: { [key: string]: [Dayjs | null, Dayjs | null] },
  until: DateUntilKeys,
  include?: boolean,
  nature?: boolean,
): [Dayjs | null, Dayjs | null] => {
  const isoUnit = unit === DateUnitKeys.week ? 'isoWeek' : (unit as UnitType);
  if (!fast) return [null, null];
  if (fast === FastTypeKeys.customer) {
    const currentDay: Dayjs = dayjs();
    const checkNature = showNature(unit);
    let [start, end] = [currentDay, currentDay];
    // 有自然且不包含 ||  没有自然且不包含
    const noUnitCal = (checkNature && nature && !include) || (!checkNature && !nature && !include);
    if (type === DynamincType.after && noUnitCal) {
      start = start.add(1, unit as UnitType).startOf(isoUnit);
      end = start.add(val, unit as UnitType);
    }
    if (type === DynamincType.before && noUnitCal) {
      end = end.startOf(isoUnit);
      start = end.subtract(val, unit as UnitType);
    }
    return customerGetDatesfromUntil(
      [start, end],
      until,
      unit,
      val,
      type,
      include,
      nature,
      checkNature,
    );
  }

  return fastMap[fast];
};

const customerGetDatesfromUntil = (
  dates: [Dayjs, Dayjs],
  until: DateUntilKeys,
  unit: DateUnitKeys,
  val: number,
  type: string,
  include: boolean | undefined,
  nature: boolean | undefined,
  checkNature: boolean,
): [Dayjs, Dayjs] => {
  const isNature = checkNature && nature;
  if ((isNature && !include) || (!checkNature && !include)) {
    return dates;
  }

  let [start, end] = dates;
  const isoUnit = unit === DateUnitKeys.week ? 'isoWeek' : (unit as UnitType);
  switch (until) {
    case DateUntilKeys.yearEnd:
      if (nature && include) {
        end = end.add(1, DateUnitKeys.years).startOf(DateUnitKeys.years);
        start = end.subtract(val, DateUnitKeys.years);
      }
      break;
    case DateUntilKeys.yearStart:
      if (nature && include) {
        start = start.startOf(DateUnitKeys.years);
        end = start.add(val, DateUnitKeys.years);
      }
      break;
    case DateUntilKeys.quarterEnd:
      if (nature && include) {
        end = end.add(1, DateUnitKeys.quarter).startOf(DateUnitKeys.quarter);
        start = end.subtract(val, DateUnitKeys.quarter);
      }
      break;
    case DateUntilKeys.quarterStart:
      if (nature && include) {
        start = start.startOf(DateUnitKeys.quarter);
        end = start.add(val, DateUnitKeys.quarter);
      }
      break;
    case DateUntilKeys.monthEnd:
      if (nature && include) {
        end = end.add(1, DateUnitKeys.month).startOf(DateUnitKeys.month);
        start = end.subtract(val, DateUnitKeys.month);
      }
      break;
    case DateUntilKeys.monthStart:
      if (nature && include) {
        start = start.startOf(DateUnitKeys.month);
        end = start.add(val, DateUnitKeys.month);
      }
      break;
    case DateUntilKeys.weekend:
      if (nature && include) {
        end = end.add(1, DateUnitKeys.week).startOf(isoUnit);
        start = end.subtract(val, DateUnitKeys.week);
      }
      break;
    case DateUntilKeys.weekStart:
      if (nature && include) {
        start = start.startOf(isoUnit);
        end = start.add(val, DateUnitKeys.week);
      }
      break;
    case DateUntilKeys.today:
      if (type === DynamincType.after) {
        start = dayjs().startOf(DateUnitKeys.day);
        if (isNature) {
          end = end.add(val, unit as UnitType).startOf(isoUnit);
        } else {
          end = start.add(val, unit as UnitType);
          // 关于周的特殊处理
          if (unit === DateUnitKeys.week && val) {
            end = end.add(1, DateUnitKeys.day);
          }
        }
      } else {
        end = end.add(1, DateUnitKeys.day).startOf(DateUnitKeys.day);
        start = start.add(1, unit as UnitType);
        if (isNature) {
          start = start.subtract(val, unit as UnitType).startOf(isoUnit);
        } else {
          start = end.subtract(val, unit as UnitType);
          // 关于周的特殊处理
          if (unit === DateUnitKeys.week && val) {
            start = start.subtract(1, DateUnitKeys.day);
          }
        }
      }
      break;
    case DateUntilKeys.now:
      if (type === DynamincType.after) {
        start = dayjs();
        end =
          unit === DateUnitKeys.day
            ? start.add(val, unit as UnitType).startOf(isoUnit)
            : start.add(val, unit as UnitType);
      } else {
        end = dayjs();
        start =
          unit === DateUnitKeys.day
            ? end
                .subtract(val, unit as UnitType)
                .add(val ? 1 : 0, unit as UnitType)
                .startOf(isoUnit)
            : end.subtract(val, unit as UnitType);
      }
      break;
    case DateUntilKeys.tomorrow:
      start = dayjs().add(1, DateUnitKeys.day).startOf(DateUnitKeys.day);
      if (isNature) {
        end = end.add(val, unit as UnitType).startOf(isoUnit);
      } else {
        end = start.add(val, unit as UnitType);
        // 关于周的特殊处理
        if (unit === DateUnitKeys.week && val) {
          end = end.add(1, DateUnitKeys.day);
        }
      }
      break;
    case DateUntilKeys.yeasterday:
      end = dayjs().startOf(DateUnitKeys.day);
      start = start.add(1, unit as UnitType);
      if (isNature) {
        start = start.subtract(val, unit as UnitType).startOf(isoUnit);
      } else {
        start = end.subtract(val, unit as UnitType);
        // 关于周的特殊处理
        if (unit === DateUnitKeys.week && val) {
          start = start.subtract(1, DateUnitKeys.day);
        }
      }
      break;
    case DateUntilKeys.onHour:
      if (type === DynamincType.after) {
        start = start.startOf(DateUnitKeys.hour);
        end = start.add(val, DateUnitKeys.hour);
      } else {
        end = end.add(1, DateUnitKeys.hour).startOf(DateUnitKeys.hour);
        start = end.subtract(val, DateUnitKeys.hour);
      }
      break;
    case DateUntilKeys.onMinute:
      if (type === DynamincType.after) {
        start = start.startOf(DateUnitKeys.minute);
        end = start.add(val, DateUnitKeys.minute);
      } else {
        end = end.add(1, DateUnitKeys.minute).startOf(DateUnitKeys.minute);
        start = end.subtract(val, DateUnitKeys.minute);
      }

      break;
    case DateUntilKeys.onSecond:
      if (type === DynamincType.after) {
        start = start.startOf(DateUnitKeys.second);
        end = start.add(val, DateUnitKeys.second);
      } else {
        end = end.add(1, DateUnitKeys.second).startOf(DateUnitKeys.second);
        start = end.subtract(val, DateUnitKeys.second);
      }

      break;

    default:
      break;
  }
  return [start, end];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const translateUnitToFormat = (_unit: DateUnitKeys): TimeFormat => {
  // normal format
  if (
    [DateUnitKeys.years, DateUnitKeys.month, DateUnitKeys.day, DateUnitKeys.week].includes(_unit)
  ) {
    return TimeFormat.no;
  }
  if ([DateUnitKeys.minute, DateUnitKeys.second, DateUnitKeys.hour]) {
    return TimeFormat.hms;
  }
  return TimeFormat.no;
};

/** 翻译传进来的结构 */
export const translateFilterData = (data: FilterDataProps): FilterListValueProps[][] => {
  const { $and } = data;
  const result: FilterListValueProps[][] = [];
  $and.forEach((andArr) => {
    const notTrans: FilterListValueProps[] = andArr.$or.map((orObj) => {
      let obj;
      if (
        (orObj as {
          $not: FilterListValueProps;
        }).$not
      ) {
        const { type, value } = (orObj as {
          $not: FilterListValueProps;
        }).$not;
        if (type === FilterTypeKeys.empty) {
          obj = {
            value,
            type: FilterTypeKeys.unempty,
          };
        }
        if (type === FilterTypeKeys.contain) {
          obj = {
            value,
            type: FilterTypeKeys.nocontain,
          };
        }
      } else {
        obj = orObj;
      }
      return obj as FilterListValueProps;
    });
    result.push(notTrans);
  });
  return result;
};

/** 规范传出结构 */
export const formatFilterData = (data: FilterListValueProps[][]): FilterDataProps => {
  const andResult = data.map((orArr: FilterListValueProps[]) => {
    const orObj = { $or: {} } as { $or: (FilterListValueProps | { $not: FilterListValueProps })[] };
    orObj.$or = orArr.map((obj) => {
      let box: FilterListValueProps | { $not: FilterListValueProps } = obj;
      if (obj.type === FilterTypeKeys.unempty) {
        box = { $not: { ...obj, type: FilterTypeKeys.empty } };
      }
      if (obj.type === FilterTypeKeys.nocontain) {
        box = { $not: { ...obj, type: FilterTypeKeys.contain } };
      }
      return box as FilterListValueProps | { $not: FilterListValueProps };
    });
    return orObj;
  });
  return { $and: andResult };
};

/** DateFilter customer模式 options的类型返回 */
export const getDateCustomerOption = (
  locale: Locale,
  unit: DateUnitKeys,
  nature: boolean,
  type: DynamincType,
): OptionsType => {
  const isRecently = type === DynamincType.before;
  const obj = {
    [DateUnitKeys.years]: isRecently
      ? [
          { label: locale.dateUnitlLocale.today, value: DateUntilKeys.today },
          { label: locale.dateUnitlLocale.yeasterday, value: DateUntilKeys.yeasterday },
          {
            label: locale.dateUnitlLocale.yearEnd,
            value: DateUntilKeys.yearEnd,
            disabled: !nature,
          },
        ]
      : [
          { label: locale.dateUnitlLocale.today, value: DateUntilKeys.today },
          { label: locale.dateUnitlLocale.tomorrow, value: DateUntilKeys.tomorrow },
          {
            label: locale.dateUnitlLocale.yearStart,
            value: DateUntilKeys.yearStart,
            disabled: !nature,
          },
        ],
    [DateUnitKeys.month]: isRecently
      ? [
          { label: locale.dateUnitlLocale.today, value: DateUntilKeys.today },
          { label: locale.dateUnitlLocale.yeasterday, value: DateUntilKeys.yeasterday },
          {
            label: locale.dateUnitlLocale.monthEnd,
            value: DateUntilKeys.monthEnd,
            disabled: !nature,
          },
        ]
      : [
          { label: locale.dateUnitlLocale.today, value: DateUntilKeys.today },
          { label: locale.dateUnitlLocale.tomorrow, value: DateUntilKeys.tomorrow },
          {
            label: locale.dateUnitlLocale.monthStart,
            value: DateUntilKeys.monthStart,
            disabled: !nature,
          },
        ],
    [DateUnitKeys.quarter]: isRecently
      ? [
          { label: locale.dateUnitlLocale.today, value: DateUntilKeys.today },
          { label: locale.dateUnitlLocale.yeasterday, value: DateUntilKeys.yeasterday },
          {
            label: locale.dateUnitlLocale.quarterEnd,
            value: DateUntilKeys.quarterEnd,
            disabled: !nature,
          },
        ]
      : [
          { label: locale.dateUnitlLocale.today, value: DateUntilKeys.today },
          { label: locale.dateUnitlLocale.tomorrow, value: DateUntilKeys.tomorrow },
          {
            label: locale.dateUnitlLocale.quarterStart,
            value: DateUntilKeys.quarterStart,
            disabled: !nature,
          },
        ],
    [DateUnitKeys.week]: isRecently
      ? [
          { label: locale.dateUnitlLocale.today, value: DateUntilKeys.today },
          { label: locale.dateUnitlLocale.yeasterday, value: DateUntilKeys.yeasterday },
          {
            label: locale.dateUnitlLocale.weekEnd,
            value: DateUntilKeys.weekend,
            disabled: !nature,
          },
        ]
      : [
          { label: locale.dateUnitlLocale.today, value: DateUntilKeys.today },
          { label: locale.dateUnitlLocale.tomorrow, value: DateUntilKeys.tomorrow },
          {
            label: locale.dateUnitlLocale.weekStart,
            value: DateUntilKeys.weekStart,
            disabled: !nature,
          },
        ],
    [DateUnitKeys.day]: [
      { label: locale.dateUnitlLocale.today, value: DateUntilKeys.today },
      { label: locale.dateUnitlLocale.now, value: DateUntilKeys.now },
    ],

    [DateUnitKeys.hour]: [
      { label: locale.dateUnitlLocale.now, value: DateUntilKeys.now },
      { label: locale.dateUnitlLocale.onHour, value: DateUntilKeys.onHour },
    ],
    [DateUnitKeys.minute]: [
      { label: locale.dateUnitlLocale.now, value: DateUntilKeys.now },
      { label: locale.dateUnitlLocale.onMinute, value: DateUntilKeys.onMinute },
    ],
    [DateUnitKeys.second]: [
      { label: locale.dateUnitlLocale.now, value: DateUntilKeys.now },
      { label: locale.dateUnitlLocale.onSecond, value: DateUntilKeys.onSecond },
    ],
  };
  return obj[unit];
};

/** DateFilter customer模式 包含文案 */
export const getDateCustomerIncludeTitle = (locale: Locale, unit: DateUnitKeys): string => {
  const obj = {
    [DateUnitKeys.years]: locale.dateUnitlLocale.years,
    [DateUnitKeys.month]: locale.dateUnitlLocale.month,
    [DateUnitKeys.quarter]: locale.dateUnitlLocale.quarter,
    [DateUnitKeys.day]: locale.dateUnitlLocale.day,
    [DateUnitKeys.week]: locale.dateUnitlLocale.week,
    [DateUnitKeys.hour]: locale.dateUnitlLocale.hour,
    [DateUnitKeys.minute]: locale.dateUnitlLocale.minute,
    [DateUnitKeys.second]: locale.dateUnitlLocale.second,
  };
  return obj[unit];
};

/** DateFilter 根据format修正date */
export const getDateWithFormat = (date: Dayjs, format?: TimeFormat): Dayjs => {
  let resultDate: Dayjs | null = null;
  switch (format) {
    case TimeFormat.no:
      resultDate = date.startOf(DateUnitKeys.day);
      break;
    case TimeFormat.h:
      resultDate = date.startOf(DateUnitKeys.hour);
      break;
    case TimeFormat.hm:
      resultDate = date.startOf(DateUnitKeys.minute);
      break;
    case TimeFormat.hms:
      resultDate = date.startOf(DateUnitKeys.second);
      break;
    default:
      resultDate = date;
      break;
  }
  return resultDate;
};
