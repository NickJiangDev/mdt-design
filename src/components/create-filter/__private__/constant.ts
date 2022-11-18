export enum FastTypeKeys {
  unlimited = 'unlimited',
  yesterday = 'yesterday',
  last24Hours = 'last24Hours',
  lastWeek = 'lastWeek',
  lastMonth = 'lastMonth',
  lastQuarter = 'lastQuarter',
  lastYear = 'lastYear',
  thisWeek = 'thisWeek',
  thisMonth = 'thisMonth',
  thisYear = 'thisYear',
  thisQuarter = 'thisQuarter',
  today = 'today',
  tomorrow = 'tomorrow',
  future24Hours = 'future24Hours',
  nextWeek = 'nextWeek',
  customer = 'customer',
  untilNow = 'untilNow',
}

export enum FilterTypeKeys {
  contain = 'contain',
  nocontain = 'nocontain',
  equal = 'eq',
  empty = 'is',
  unempty = 'notis',
  startwith = 'startwith',
  endwith = 'endwith',
  eitherof = 'in',
  neitherof = 'notin',
}

export enum DateUnitKeys {
  years = 'years',
  month = 'month',
  quarter = 'quarter',
  day = 'day',
  week = 'week',
  hour = 'hour',
  minute = 'minute',
  second = 'second',
}

export enum DateUntilKeys {
  yearEnd = 'yearEnd',
  yearStart = 'yearStart',
  quarterEnd = 'quarterEnd',
  quarterStart = 'quarterStart',
  monthEnd = 'monthEnd',
  monthStart = 'monthStart',
  yeasterday = 'yesterday',
  weekend = 'weekend',
  weekStart = 'weekStart',
  today = 'today',
  now = 'now',
  tomorrow = 'tomorrow',
  onHour = 'onHour',
  onMinute = 'onMinute',
  onSecond = 'onSecond',
}

export enum DynamincType {
  after = 'after',
  before = 'before',
}

export enum TextFilterTypeSet {
  standard = 'standard', // 标准
  filter = 'filter', // 筛选
}

// 展示自然勾选
export const showNature = (unit: DateUnitKeys): boolean =>
  [DateUnitKeys.years, DateUnitKeys.quarter, DateUnitKeys.week, DateUnitKeys.month].includes(unit);

export const KEY_SLOT = '-';

export const prefixCls = 'dmc-date-filter';

export const NUMBER_REG = /^([1-9]\d?)$/;
