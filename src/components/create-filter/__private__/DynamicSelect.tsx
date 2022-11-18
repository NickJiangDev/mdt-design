import * as React from 'react';
import { OptionsType } from 'rc-select/lib/interface';
import { DateUnitKeys, DynamincType } from './constant';
import Select from '../../select';
import { InputNumber } from '../../input';
import { Locale } from '../languages/zh-CN';
import { prefixCls } from '../DateFilter';
import Checkbox from '@/components/checkbox';

export interface DynamicSelectProps {
  locale: Locale;
  getPopupContainer: () => HTMLDivElement;
  type: DynamincType;
  onTypeChange: (val: DynamincType) => void;
  dynamicVal?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNumChange: (value?: any) => void;
  unit: DateUnitKeys;
  nature?: boolean;
  onNatureChange?: (nature: boolean) => void;
  onUnitChange: (value: DateUnitKeys) => void;
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({
  type,
  unit,
  locale,
  onTypeChange,
  dynamicVal,
  onNumChange,
  onUnitChange,
  getPopupContainer,
  nature,
  onNatureChange,
}) => {
  const { filterLocale: fLocale, dateUnitLocale: dLocale } = locale;
  const typeOptions: OptionsType = [DynamincType.after, DynamincType.before].map((t) => ({
    label: fLocale[t],
    key: t,
    value: t,
  }));
  const natureTitle = {
    [DateUnitKeys.years]: dLocale.yearsInclude,
    [DateUnitKeys.quarter]: dLocale.quarterInclude,
    [DateUnitKeys.month]: dLocale.monthInclude,
    [DateUnitKeys.week]: dLocale.weekInclude,
  } as { [T: string]: string };
  const unitOptions: OptionsType = [
    DateUnitKeys.years,
    DateUnitKeys.quarter,
    DateUnitKeys.month,
    DateUnitKeys.week,
    DateUnitKeys.day,
    DateUnitKeys.hour,
    DateUnitKeys.minute,
    // DateUnitKeys.second,
  ].map((t: DateUnitKeys) => {
    return { label: dLocale[t], value: t, key: t };
  });

  return (
    <div className={`${prefixCls}-dynamic`}>
      <div className={`${prefixCls}-dynamic-label`}>{fLocale.labelDynamic}：</div>
      <Select
        size="mini"
        type="menu-bg"
        value={type}
        options={typeOptions}
        onChange={onTypeChange}
        getPopupContainer={getPopupContainer}
      />
      <InputNumber
        size="compact"
        type="menu-bg"
        value={dynamicVal}
        onChange={onNumChange}
        style={{ width: 89 }}
        visibilityHandler
        placeholder={fLocale.placeholder}
        className={`${prefixCls}-dynamic-input`}
      />
      <Select
        size="mini"
        type="menu-bg"
        value={unit}
        options={unitOptions}
        onChange={onUnitChange}
        getPopupContainer={getPopupContainer}
      />
      {natureTitle[unit] && (
        <Checkbox
          className={`${prefixCls}-dynamic-checkbox`}
          title={natureTitle[unit]}
          checked={nature}
          onChange={onNatureChange}
        />
      )}
    </div>
  );
};

DynamicSelect.displayName = 'DynamicSelect';
export default DynamicSelect;

const DynamicSelectMemo = React.memo(DynamicSelect);
DynamicSelectMemo.displayName = 'DynamicSelectMemo';
export { DynamicSelectMemo };
