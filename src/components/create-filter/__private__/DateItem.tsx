import * as React from 'react';
import DatePicker, { DatePickerProps } from '../../date-picker';
import Checkbox from '../../checkbox';
import { prefixCls } from '../DateFilter';
import Select, { OptionsType } from '@/components/select';
import { DateUnitKeys, DateUntilKeys } from './constant';
import classNames from 'classnames';

export type DateItemProps = DatePickerProps & {
  label: string;
  unit?: DateUnitKeys;
  fastType?: string;
  include?: boolean;
  showCheckbox?: boolean;
  checkboxDisabled?: boolean;
  showUntil?: boolean;
  format?: string;
  /** 菜单渲染父节点。默认渲染到 body 上 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  untilValue?: DateUntilKeys;
  untilOptions?: OptionsType;
  onUntilValueChange?: (value: DateUntilKeys, option: OptionsType[number] | OptionsType) => void;
  untilTitle: string;
  labelInclude: string;
  onCheck: (checked: boolean) => void;
  min?: string;
  max?: string;
};

const DateItem: React.FC<DateItemProps> = ({
  label,
  onCheck,
  showCheckbox,
  showUntil,
  include,
  getPopupContainer,
  labelInclude,
  untilOptions,
  min,
  max,
  untilValue,
  onUntilValueChange,
  untilTitle,
  checkboxDisabled,
  format,
  ...restProps
}) => {
  const tip = min ?? max;
  return (
    <div className={`${prefixCls}-date-item`}>
      <div className={`${prefixCls}-date-label`}>
        {label}
        {tip ? ` (${tip})` : ''}
      </div>
      <DatePicker
        {...restProps}
        placeholder=""
        className={`${prefixCls}-date-picker`}
        type="assist-bg"
        getPopupContainer={getPopupContainer}
        format={format}
      />
      <div className={`${prefixCls}-date-item-footer`}>
        <Checkbox
          type="menu-bg"
          size="compact"
          title={labelInclude}
          onChange={onCheck}
          checked={include}
          disabled={checkboxDisabled}
          className={classNames({
            [`${prefixCls}-include-today`]: true,
            [`${prefixCls}-include-today-visible`]: !showCheckbox,
          })}
        />
        {showUntil && (
          <div className={`${prefixCls}-date-item-footer-until`}>
            <span className={`${prefixCls}-date-item-footer-until-desc`}>{untilTitle}</span>
            <Select
              size="mini"
              type="menu-bg"
              value={untilValue}
              options={untilOptions}
              onChange={onUntilValueChange}
              getPopupContainer={getPopupContainer}
            />
          </div>
        )}
      </div>
    </div>
  );
};

DateItem.displayName = 'DateItem';
export default DateItem;

const DateItemMemo = React.memo(DateItem);
DateItemMemo.displayName = 'DateItemMemo';
export { DateItemMemo };
