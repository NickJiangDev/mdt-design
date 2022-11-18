import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import classNames from 'classnames';
import { MenuInfo } from 'rc-menu/lib/interface';
import CreateFilter from './CreateFilter';
import {
  getDateCustomerIncludeTitle,
  getDateCustomerOption,
  getDateWithFormat,
  getDurationOfFastType,
  // translateUnitToFormat,
} from './__private__/helper';
import zhCn, { Locale } from './languages/zh-CN';
import {
  DateUnitKeys,
  DynamincType,
  FastTypeKeys,
  DateUntilKeys,
  showNature,
} from './__private__/constant';
import FastTypes from './__private__/FastTypes';
import DateItem, { DateItemProps } from './__private__/DateItem';
import DynamicSelect from './__private__/DynamicSelect';
import './style/date-filter.less';
import { TooltipPlacement } from '@/components/tooltip';
import { TimeFormat } from '../date-picker';

dayjs.extend(quarterOfYear);
dayjs.extend(isoWeek);
dayjs.locale();

export type DateUnit = DateUnitKeys;
export type DateType = DynamincType;

export { TimeFormat };

export interface DateFilterResult {
  start?: string;
  end?: string;
  startFormat?: TimeFormat;
  endFormat?: TimeFormat;
  startProps?: DateItemProps;
  endProps?: DateItemProps;
  fastType?: string;
  include?: boolean;
  type?: DynamincType;
  value?: number;
  unit?: DateUnitKeys;
  startMoment?: Dayjs;
  endMoment?: Dayjs;
  untilValue?: DateUntilKeys;
  nature?: boolean;
}

export interface DateFilterProps {
  /** 加载样式 */
  loading?: boolean;
  /** 详见DateFilterResult */
  value?: DateFilterResult;
  /** 关闭按钮的点击回调 */
  onClose?: () => void;
  /** 当前语言 */
  locale?: Locale;
  /** 类名 */
  className?: string;
  children: React.ReactElement | string;
  /** 确定按钮的点击回调 */
  onOk?: (result: DateFilterResult) => void;
  /** 确定按钮的文案 */
  okButtonLabel?: React.ReactNode;
  /** 取消按钮的文案 */
  cancelButtonLabel?: React.ReactNode;
  /** 任意点击关闭 */
  clickAway?: boolean;
  /**气泡框位置 */
  placement?: TooltipPlacement;
  /** 内容的类名 */
  overlayClassName?: string;
  /** 最小值的文案描述 */
  min?: string;
  /** 最大值的文案描述 */
  max?: string;
  /** 菜单渲染父节点。默认渲染到 body 上 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

export const prefixCls = 'dmc-date-filter';
const FORMAT = 'YYYY-MM-DD HH:mm:ss';
const { useState, useCallback, useEffect } = React;

const DateFilter: React.FC<DateFilterProps> = (props) => {
  const {
    locale,
    className,
    children,
    onOk,
    onClose,
    value,
    min,
    max,
    ...restProps
  } = props as DateFilterProps & typeof defaultProps;
  const {
    fastType: fast = FastTypeKeys.unlimited,
    start,
    end,
    startFormat: sf,
    endFormat: ef,
    startProps,
    endProps,
    value: num,
    include: inc = true,
    type = DynamincType.before,
    unit = DateUnitKeys.day,
    untilValue = DateUntilKeys.today,
    nature = false,
  } = value || {};

  const ref = React.useRef<HTMLDivElement>(null);
  const getPopupContainer = React.useCallback(() => ref.current as HTMLDivElement, []);
  const [fastType, setFastType] = useState<string | undefined>(fast);
  const [startDate, setStartDate] = useState<Dayjs | null>(start ? dayjs(start) : null);
  const [endDate, setEndDate] = useState<Dayjs | null>(end ? dayjs(end) : null);
  const [startFormat, setStartFormat] = useState<TimeFormat | undefined>(sf ?? TimeFormat.no);
  const [endFormat, setEndFormat] = useState<TimeFormat | undefined>(ef ?? TimeFormat.no);
  const [include, setInclude] = useState(inc);
  const [dynamicVal, setDynamicVal] = useState<number | undefined>(num);
  const [dynamicType, setDynamicType] = useState<DynamincType>(type);
  const [dynamicUnit, setDynamicUnit] = useState<DateUnitKeys>(unit);
  const [dynamicNature, setDynamicNature] = useState<boolean>(nature);
  const [dynamicUntilValue, setDynamicUntilValue] = useState<DateUntilKeys>(untilValue);
  // 这个visible是根据CreateFilter的钩子函数来得到的状态，并不是内部组件的显示隐藏状态！
  const [parentVisible, setParentVisible] = useState<boolean>(false);
  // 组件内状态，用来控制picker展开是显示的format(展开时不需要format)
  const [needStartDateFilterFormat, setNeedStartDateFilterFormat] = useState<boolean>(true);
  const [needEndDateFilterFormat, setNeedEndDateFilterFormat] = useState<boolean>(true);
  useEffect(() => {
    setFastType(fast);
    setStartDate(start ? dayjs(start) : null);
    setEndDate(end ? dayjs(end) : null);
    setInclude(inc);
    setDynamicVal(num);
    setDynamicType(type);
    setDynamicUnit(unit);
    setDynamicUntilValue(untilValue);
    setDynamicNature(nature);
  }, [fast, start, end, inc, num, type, unit, untilValue, nature]);

  useEffect(() => {
    setStartFormat(startFormat);
    setEndFormat(endFormat);
  }, [startFormat, endFormat]);

  const handleConfim = useCallback(() => {
    if (onOk) {
      const config: DateFilterResult = {};
      if (fastType) {
        config.fastType = fastType;
      }
      if (fastType === FastTypeKeys.customer) {
        config.value = dynamicVal;
        config.type = dynamicType;
        config.unit = dynamicUnit;
        config.untilValue = dynamicUntilValue;
        config.include = include;
        config.nature = dynamicNature;
      }

      if (startDate) {
        config.start = dayjs(startDate).format(FORMAT);
        config.startMoment = startDate;
      }
      if (endDate) {
        config.end = dayjs(endDate).format(FORMAT);
        config.endMoment = endDate;
      }

      if (startFormat) {
        config.startFormat = startFormat;
      }
      if (endFormat) {
        config.endFormat = endFormat;
      }
      onOk(config);
    }
  }, [
    onOk,
    fastType,
    startDate,
    endDate,
    startFormat,
    endFormat,
    dynamicVal,
    dynamicType,
    dynamicUnit,
    dynamicUntilValue,
    include,
    dynamicNature,
  ]);

  const fastMap: { [key: string]: [Dayjs | null, Dayjs | null] } = React.useMemo(() => {
    return {
      [FastTypeKeys.customer]: [null, null],
      [FastTypeKeys.unlimited]: [null, null],
      [FastTypeKeys.untilNow]: [null, dayjs().add(1, 'days').startOf('day')],
      [FastTypeKeys.tomorrow]: [
        dayjs().add(1, 'days').startOf('day'),
        dayjs().add(2, 'days').startOf('day'),
      ],
      [FastTypeKeys.last24Hours]: [dayjs().subtract(24, 'hours'), dayjs()],
      [FastTypeKeys.yesterday]: [
        dayjs().subtract(1, 'days').startOf('day'),
        dayjs().startOf('day'),
      ],
      [FastTypeKeys.lastWeek]: [
        dayjs().subtract(1, 'weeks').startOf('isoWeek'),
        dayjs().startOf('isoWeek'),
      ],
      [FastTypeKeys.lastMonth]: [
        dayjs().subtract(1, 'months').startOf('month'),
        dayjs().startOf('month'),
      ],
      [FastTypeKeys.lastQuarter]: [
        dayjs().subtract(1, 'quarters').startOf('quarter'),
        dayjs().startOf('quarter'),
      ],
      [FastTypeKeys.lastYear]: [
        dayjs().subtract(1, 'years').startOf('year'),
        dayjs().startOf('year'),
      ],
      [FastTypeKeys.today]: [dayjs().startOf('day'), dayjs().add(1, 'days').startOf('day')],
      [FastTypeKeys.thisWeek]: [
        dayjs().startOf('isoWeek'),
        dayjs().add(1, 'weeks').startOf('isoWeek'),
      ],
      [FastTypeKeys.thisMonth]: [
        dayjs().startOf('month'),
        dayjs().add(1, 'months').startOf('month'),
      ],
      [FastTypeKeys.thisQuarter]: [
        dayjs().startOf('quarter'),
        dayjs().add(1, 'quarters').startOf('quarter'),
      ],
      [FastTypeKeys.thisYear]: [dayjs().startOf('year'), dayjs().add(1, 'years').startOf('year')],
      [FastTypeKeys.future24Hours]: [dayjs(), dayjs().add(24, 'hours')],
      [FastTypeKeys.nextWeek]: [
        dayjs().add(1, 'weeks').startOf('week').add(1, 'days'),
        dayjs().add(2, 'weeks').startOf('week').add(1, 'days'),
      ],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentVisible]);

  const changeDateByFastType = useCallback(
    (
      fast: string | undefined,
      val: number | undefined,
      type: DynamincType,
      unit: DateUnitKeys,
      until: DateUntilKeys,
      include?: boolean,
      unitInclude?: boolean,
    ) => {
      if (fast === FastTypeKeys.unlimited) {
        setStartDate(start ? dayjs(start) : null);
        setEndDate(end ? dayjs(end) : null);
        return;
      }
      const [fastTypeStart, fastTypeEnd] = getDurationOfFastType(
        fast,
        val,
        type,
        unit,
        fastMap,
        until,
        include,
        unitInclude,
      );
      // const tf = translateUnitToFormat(unit);
      // setStartFormat(tf);
      // setEndFormat(tf);
      setStartDate(fastTypeStart);
      setEndDate(fastTypeEnd);
    },
    [fastMap, start, end],
  );

  const onChangeFast = useCallback(
    (info: MenuInfo) => {
      const key = info.key as string;
      if (key) {
        setFastType(key);
        changeDateByFastType(
          key,
          dynamicVal,
          dynamicType,
          dynamicUnit,
          dynamicUntilValue,
          include,
          dynamicNature,
        );
      }
    },
    [
      changeDateByFastType,
      dynamicVal,
      dynamicType,
      dynamicUnit,
      dynamicUntilValue,
      include,
      dynamicNature,
    ],
  );

  const onChangeDynamicVal = useCallback(
    (val?: number) => {
      setDynamicVal(val);
      changeDateByFastType(
        fastType,
        val,
        dynamicType,
        dynamicUnit,
        dynamicUntilValue,
        include,
        dynamicNature,
      );
    },
    [
      changeDateByFastType,
      fastType,
      dynamicType,
      dynamicUnit,
      dynamicUntilValue,
      include,
      dynamicNature,
    ],
  );

  const onChangeDynamicType = useCallback(
    (val: DynamincType) => {
      setDynamicType(val);
      setInclude(true);
      const untilVal = showNature(dynamicUnit) ? DateUntilKeys.today : DateUntilKeys.now;
      setDynamicUntilValue(untilVal);
      changeDateByFastType(fastType, dynamicVal, val, dynamicUnit, untilVal, true, dynamicNature);
    },
    [changeDateByFastType, fastType, dynamicVal, dynamicUnit, dynamicNature],
  );

  const onChangeDynamicUnit = useCallback(
    (val: DateUnitKeys) => {
      const untilVal = showNature(val) ? DateUntilKeys.today : DateUntilKeys.now;
      setDynamicUnit(val);
      setDynamicUntilValue(untilVal);
      setDynamicNature(false);
      setInclude(true);
      changeDateByFastType(fastType, dynamicVal, dynamicType, val, untilVal, true, false);
    },
    [changeDateByFastType, fastType, dynamicVal, dynamicType],
  );

  const onChangeDynamicNature = useCallback(
    (val: boolean) => {
      setDynamicNature(val);
      setInclude(true);
      const untilVal = showNature(dynamicUnit) ? DateUntilKeys.today : DateUntilKeys.now;
      setDynamicUntilValue(untilVal);
      changeDateByFastType(fastType, dynamicVal, dynamicType, dynamicUnit, untilVal, true, val);
    },
    [changeDateByFastType, dynamicType, dynamicUnit, dynamicVal, fastType],
  );

  const onUntilValueChange = useCallback(
    (val: DateUntilKeys) => {
      setDynamicUntilValue(val);
      changeDateByFastType(
        fastType,
        dynamicVal,
        dynamicType,
        dynamicUnit,
        val,
        include,
        dynamicNature,
      );
    },
    [changeDateByFastType, dynamicNature, dynamicType, dynamicUnit, dynamicVal, fastType, include],
  );

  const onIncludeChange = useCallback(
    (val: boolean) => {
      setInclude(val);
      changeDateByFastType(
        fastType,
        dynamicVal,
        dynamicType,
        dynamicUnit,
        dynamicUntilValue,
        val,
        dynamicNature,
      );
    },
    [
      changeDateByFastType,
      dynamicNature,
      dynamicType,
      dynamicUnit,
      dynamicUntilValue,
      dynamicVal,
      fastType,
    ],
  );

  const handleClose = useCallback(() => {
    setStartDate(start ? dayjs(start) : null);
    setEndDate(end ? dayjs(end) : null);
    setInclude(inc);
    setDynamicUnit(unit);
    setDynamicType(type);
    setDynamicVal(num);
    setFastType(fast);
    setDynamicNature(nature);
    if (onClose) {
      onClose();
    }
  }, [start, end, inc, unit, type, num, fast, nature, onClose]);

  const startDateChange = useCallback(
    (date: Dayjs | null, _dateString: string, timeFormat?: TimeFormat) => {
      if (fastType !== FastTypeKeys.untilNow) setFastType(FastTypeKeys.unlimited);
      const newDate = getDateWithFormat(date as Dayjs, timeFormat);
      setStartDate(newDate);
      setStartFormat(timeFormat);
    },
    [fastType],
  );

  const startDateSelect = useCallback(
    (timeFormat: TimeFormat) => {
      const newDate = startDate && getDateWithFormat(startDate as Dayjs, timeFormat);
      newDate && setStartDate(newDate);
      setStartFormat(timeFormat);
    },
    [startDate],
  );

  const onStartOpenChange = useCallback((open: boolean) => {
    setNeedStartDateFilterFormat(!open);
  }, []);

  const onEndOpenChange = useCallback((open: boolean) => {
    setNeedEndDateFilterFormat(!open);
  }, []);

  const endDateSelect = useCallback(
    (timeFormat: TimeFormat) => {
      const newDate = endDate && getDateWithFormat(endDate as Dayjs, timeFormat);
      newDate && setEndDate(newDate);
      setEndFormat(timeFormat);
    },
    [endDate],
  );

  const endDateChange = useCallback(
    (date: Dayjs | null, _dateString: string, timeFormat?: TimeFormat) => {
      setFastType(FastTypeKeys.unlimited);
      const newDate = getDateWithFormat(date as Dayjs, timeFormat);
      setEndDate(newDate);
      setEndFormat(timeFormat);
    },
    [],
  );

  const onVisibleChange = useCallback((visible: boolean) => {
    setParentVisible(visible);
  }, []);

  useEffect(() => {
    if (parentVisible) {
      if (fastType && fastType !== FastTypeKeys.unlimited) {
        changeDateByFastType(
          fastType,
          dynamicVal,
          dynamicType,
          dynamicUnit,
          dynamicUntilValue,
          include,
          dynamicNature,
        );
        // 预增逻辑: 当选过开始时间后，startDate跟随选中的时间来走
        if (start !== null && fastType === FastTypeKeys.untilNow) {
          setStartDate(start ? dayjs(start) : null);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // changeDateByFastType,
    // dynamicType,
    // dynamicUnit,
    // dynamicNature,
    // dynamicVal,
    // end,
    fastType,
    parentVisible,
    start,
  ]);

  const { labelStart, labelEnd, labelFastType, untilNow } = locale.filterLocale;
  const isCustomer = fastType === FastTypeKeys.customer;
  const isFater = dynamicType === DynamincType.after;

  const checkNature = showNature(dynamicUnit);
  const showStartFooter = isCustomer && isFater;
  const showEndFooter = isCustomer && !isFater;
  const checkboxDisabled = checkNature && !dynamicNature;
  const natureIncludeControl =
    include ||
    (checkNature && !dynamicNature && !include) ||
    (checkNature && dynamicNature && include);

  const overlay = (
    <div ref={ref} className={`${prefixCls}`}>
      <FastTypes
        locale={locale}
        value={fastType}
        onClickMenuItem={onChangeFast}
        labelFastType={labelFastType}
        getPopupContainer={getPopupContainer}
      />
      {isCustomer && (
        <DynamicSelect
          locale={locale}
          unit={dynamicUnit}
          type={dynamicType}
          dynamicVal={dynamicVal}
          nature={dynamicNature}
          onNumChange={onChangeDynamicVal}
          onTypeChange={onChangeDynamicType}
          onUnitChange={onChangeDynamicUnit}
          onNatureChange={onChangeDynamicNature}
          getPopupContainer={getPopupContainer}
        />
      )}
      <div className={`${prefixCls}-date-wrap`}>
        <DateItem
          {...startProps}
          timeFormat={startFormat}
          min={min}
          label={labelStart}
          value={startDate}
          fastType={fastType}
          include={include}
          labelInclude={getDateCustomerIncludeTitle(locale, dynamicUnit)}
          onFormatChange={startDateSelect}
          onChange={startDateChange}
          onCheck={onIncludeChange}
          getPopupContainer={getPopupContainer}
          showCheckbox={showStartFooter}
          checkboxDisabled={checkboxDisabled}
          showUntil={showStartFooter && natureIncludeControl}
          untilValue={dynamicUntilValue}
          untilOptions={getDateCustomerOption(locale, dynamicUnit, dynamicNature, dynamicType)}
          untilTitle={untilNow}
          onUntilValueChange={onUntilValueChange}
          onOpenChange={onStartOpenChange}
          format={needStartDateFilterFormat ? FORMAT : undefined}
        />
        <span className={`${prefixCls}-date-split`}>-</span>
        <DateItem
          {...endProps}
          timeFormat={endFormat}
          max={max}
          label={labelEnd}
          value={endDate}
          fastType={fastType}
          include={include}
          labelInclude={getDateCustomerIncludeTitle(locale, dynamicUnit)}
          onFormatChange={endDateSelect}
          onChange={endDateChange}
          onCheck={onIncludeChange}
          getPopupContainer={getPopupContainer}
          showCheckbox={showEndFooter}
          checkboxDisabled={checkboxDisabled}
          showUntil={showEndFooter && natureIncludeControl}
          untilValue={dynamicUntilValue}
          untilOptions={getDateCustomerOption(locale, dynamicUnit, dynamicNature, dynamicType)}
          untilTitle={untilNow}
          onUntilValueChange={onUntilValueChange}
          onOpenChange={onEndOpenChange}
          format={needEndDateFilterFormat ? FORMAT : undefined}
        />
      </div>
    </div>
  );

  return (
    <CreateFilter
      {...restProps}
      onOk={handleConfim}
      onClose={handleClose}
      className={classNames(prefixCls, className)}
      footerClassName={`${prefixCls}-footer`}
      overlay={overlay}
      onVisibleChange={onVisibleChange}
    >
      {children}
    </CreateFilter>
  );
};

DateFilter.displayName = 'DateFilter';
export default DateFilter;

const defaultProps = {
  placement: 'bottomLeft' as TooltipPlacement,
  locale: zhCn,
};
DateFilter.defaultProps = defaultProps;
const DateFilterMemo = React.memo(DateFilter);
DateFilterMemo.displayName = 'DateFilterMemo';
export { DateFilterMemo };
