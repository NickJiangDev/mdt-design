/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef, Fragment } from 'react';
import classNames from 'classnames';
import { LinkButton } from '../../button';
import Select, { Mode, OptionsType } from '../../select';
import Icon from '../../icon';
import Input from '../../input';
import { ObjectInterface } from '../../_utils/interfaces';
import { Locale } from '../languages/zh-CN';
import FilterTypes from './FilterTypes';
import { FilterTypeKeys, KEY_SLOT } from './constant';
import { cloneDeep, fill, pull } from 'lodash';

const prefixCls = 'dmc-text-filter';

const initialFilterData = {
  type: FilterTypeKeys.contain,
  value: undefined,
};

export interface FilterListValueProps {
  type: FilterTypeKeys;
  value?: any;
}

const splitData = (data: FilterListValueProps[][], key: string, slot = KEY_SLOT) => {
  const ds = cloneDeep(data);
  const [andCount, orCount] = key.split(slot);
  const orArray = ds[~~andCount];
  const currentOr = orArray[~~orCount];
  return { andCount, orCount, orArray, currentOr, ds };
};

enum FilterListCellType {
  or = 'or',
  both = 'both',
}
interface FilterListCellProps {
  id: string;
  value: FilterListValueProps;
  orTitle?: boolean;
  disabled?: boolean;
  closeable?: boolean;
  extra?: FilterListCellType;
  searchOptions?: OptionsType;
  locale: Locale;
  onAndClick?: (id: string) => void;
  onOrClick?: (id: string) => void;
  onMenuClick?: (info: ObjectInterface, id: string) => void;
  onSelect?: (info: any, id: string) => void;
  onSelectChange?: () => void;
  onClose?: (id: string) => void;
}
export const FilterListCell = (props: FilterListCellProps) => {
  const {
    value,
    orTitle,
    disabled,
    closeable,
    extra,
    searchOptions,
    locale,
    onAndClick,
    onOrClick,
    onMenuClick,
    onSelect,
    onClose,
    id,
  } = props;
  const { type, value: filterValue } = value;
  // 多选
  const isMuti = [FilterTypeKeys.eitherof, FilterTypeKeys.neitherof].includes(type);
  // 无选项
  const isDisabled = [FilterTypeKeys.empty, FilterTypeKeys.unempty].includes(type);
  // 输入框
  const isInput = [
    FilterTypeKeys.contain,
    FilterTypeKeys.nocontain,
    FilterTypeKeys.startwith,
    FilterTypeKeys.endwith,
  ].includes(type);

  const ref = useRef<HTMLDivElement>(null);
  const getPopupContainer = useCallback(() => ref.current as HTMLDivElement, []);
  const _onMenuClick = useCallback(
    (info) => {
      onMenuClick && onMenuClick(info, id);
    },
    [id, onMenuClick],
  );
  const _andClick = useCallback(() => {
    onAndClick && onAndClick(id);
  }, [id, onAndClick]);
  const _orClick = useCallback(() => {
    onOrClick && onOrClick(id);
  }, [id, onOrClick]);
  const _onClose = useCallback(() => {
    onClose && onClose(id);
  }, [id, onClose]);
  const _onSelect = useCallback(
    (info) => {
      onSelect && onSelect(info, id);
    },
    [id, onSelect],
  );
  const onChange = useCallback(
    (e) => {
      onSelect && onSelect(e.target.value.trim(), id);
    },
    [id, onSelect],
  );
  return (
    <div className={`${prefixCls}-filter-list-cell`} ref={ref}>
      {orTitle && <span className={`${prefixCls}-filter-list-cell-text`}>或</span>}
      <FilterTypes
        value={type}
        locale={locale}
        onClickMenuItem={_onMenuClick}
        getPopupContainer={getPopupContainer}
      />
      {isInput ? (
        <Input
          className={classNames({
            [`${prefixCls}-filter-list-cell-disabled`]: isDisabled,
            [`${prefixCls}-filter-list-cell-width`]: orTitle,
          })}
          value={filterValue}
          type="menu-bg"
          size="compact"
          disabled={isDisabled || disabled}
          onChange={onChange}
        />
      ) : (
        <Select
          className={classNames({
            [`${prefixCls}-filter-list-cell-disabled`]: isDisabled,
            [`${prefixCls}-filter-list-cell-width`]: orTitle,
          })}
          mode={isMuti ? ('multiple' as Mode) : undefined}
          type="menu-bg"
          size="compact"
          showArrow={false}
          showSearch
          disabled={isDisabled || disabled}
          options={searchOptions}
          getPopupContainer={getPopupContainer}
          onChange={_onSelect}
          value={filterValue}
        />
      )}

      <Icon
        icon="close"
        className={classNames({
          [`${prefixCls}-filter-list-cell-icon`]: true,
          [`${prefixCls}-filter-list-cell-icon-none`]: !closeable,
        })}
        onClick={_onClose}
      />
      {extra && extra === FilterListCellType.both && (
        <span className={`${prefixCls}-filter-list-cell-extra`}>
          <LinkButton size="compact" onClick={_andClick}>
            且
          </LinkButton>
          &
          <LinkButton size="compact" onClick={_orClick}>
            或
          </LinkButton>
        </span>
      )}
      {extra && extra === FilterListCellType.or && (
        <span className={`${prefixCls}-filter-list-cell-extra`}>
          <LinkButton size="compact" onClick={_orClick}>
            或
          </LinkButton>
        </span>
      )}
    </div>
  );
};

interface FilterListProps {
  searchOptions?: OptionsType;
  locale: Locale;
  dataSource: FilterListValueProps[][];
  onChange?: (dataSource: FilterListValueProps[][]) => void;
}

const FilterList = (props: FilterListProps) => {
  const { searchOptions, locale, dataSource = [[initialFilterData]], onChange } = props;
  const cellProps = { searchOptions, locale };

  const onAndClick = useCallback(() => {
    onChange && onChange([...dataSource, [initialFilterData]]);
  }, [dataSource, onChange]);

  const onOrClick = useCallback(
    (key: string) => {
      const { ds, andCount } = splitData(dataSource, key);
      const insert = ds[~~andCount].concat([initialFilterData]);
      const newDataSource = fill(ds, insert, ~~andCount, ~~andCount + 1);
      onChange && onChange(newDataSource);
    },
    [dataSource, onChange],
  );

  const onClose = useCallback(
    (key: string) => {
      const { ds, andCount, orCount } = splitData(dataSource, key);
      const orArray = ds[~~andCount];
      let newDataSource;
      if (orArray.length <= 1) {
        newDataSource = pull(ds, orArray);
      } else {
        const newOrArray = pull(ds[~~andCount], ds[~~andCount][~~orCount]);
        newDataSource = fill(ds, newOrArray, ~~andCount, ~~andCount + 1);
      }
      onChange && onChange(newDataSource);
    },
    [dataSource, onChange],
  );

  const onMenuClick = useCallback(
    (info: ObjectInterface, key: string) => {
      const { ds, andCount, orCount, orArray, currentOr } = splitData(dataSource, key);
      const currentOrArray = fill(
        orArray,
        { ...currentOr, type: info.key, value: undefined },
        ~~orCount,
        ~~orCount + 1,
      );
      onChange && onChange(fill(ds, currentOrArray, ~~andCount, ~~andCount + 1));
    },
    [dataSource, onChange],
  );

  const onSelect = useCallback(
    (value: any, key: string) => {
      const { ds, andCount, orCount, orArray, currentOr } = splitData(dataSource, key);
      const currentOrArray = fill(
        orArray,
        { ...currentOr, value: value },
        ~~orCount,
        ~~orCount + 1,
      );
      onChange && onChange(fill(ds, currentOrArray, ~~andCount, ~~andCount + 1));
    },
    [dataSource, onChange],
  );
  return (
    <div className={`${prefixCls}-filter-list`}>
      {dataSource.map((orArray, andCount) => {
        return (
          <Fragment key={andCount}>
            {orArray.map((info, i) => {
              const key = `${andCount}${KEY_SLOT}${i}`;
              const orTitle = i !== 0;
              const extra =
                dataSource.length === andCount + 1 && orArray.length === i + 1
                  ? FilterListCellType.both
                  : orArray.length === 1 || orArray.length === i + 1
                  ? FilterListCellType.or
                  : undefined;
              return (
                <FilterListCell
                  {...cellProps}
                  value={info}
                  orTitle={orTitle}
                  extra={extra}
                  closeable={!(dataSource.length === 1 && orArray.length === 1)}
                  key={key}
                  id={key}
                  onAndClick={onAndClick}
                  onOrClick={onOrClick}
                  onClose={onClose}
                  onMenuClick={onMenuClick}
                  onSelect={onSelect}
                />
              );
            })}
            {dataSource.length !== andCount + 1 && (
              <div className={`${prefixCls}-filter-list-divider`}>
                且<span />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default FilterList;
