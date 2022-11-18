import * as React from 'react';
import classNames from 'classnames';
import CheckList from '../check-list';
import CreateFilter, { FilterButtonProps } from './CreateFilter';
import './style/text-filter.less';
import { TooltipPlacement } from '@/components/tooltip';
import { LabelValueItemInterface } from '../_utils/interfaces';
import { IconButton, LinkButton } from '../button';
import { OptionsType } from '../select';
import zhCn, { Locale } from './languages/zh-CN';
import { TextFilterTypeSet } from './__private__/constant';
import { isString, isEmpty, filter, map, first, get } from 'lodash';
import { translateFilterData, formatFilterData } from './__private__/helper';
import FilterList, { FilterListValueProps } from './__private__/FilterList';

const prefixCls = 'dmc-text-filter';

export interface FilterDataProps {
  $and: { $or: (FilterListValueProps | { $not: FilterListValueProps })[] }[];
}

export interface TextFilterProps {
  /** 加载样式 */
  loading?: boolean;
  /** 指定当前选中的条目 */
  values?: string[];
  /** 数据化配置选项内容 */
  list?: string[] | LabelValueItemInterface[];
  /** 点击关闭按钮的回调 */
  onClose?: () => void;
  /** 点击确定按钮的回调 */
  onOk?: (selected: string[], filterData?: FilterDataProps) => void;
  /** 类名 */
  className?: string;
  children: React.ReactElement | string;
  /** 确定按钮的文案 */
  okButtonLabel?: React.ReactNode;
  /** 关闭按钮的文案 */
  cancelButtonLabel?: React.ReactNode;
  /** 全选的文案 */
  allSelectLabel?: React.ReactNode;
  /** 任意点击关闭 */
  clickAway?: boolean;
  /**气泡框位置 */
  placement?: TooltipPlacement;
  /** 内容的类名 */
  overlayClassName?: string;
  /** 空值占位文案 */
  emptyValText?: string;
  /** 单选配置项 */
  radio?: boolean;
  /** 菜单渲染父节点。默认渲染到 body 上 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** 标准模式 | 筛选模式 不传无切换功能 */
  type?: TextFilterTypeSet;
  /** 当前语言 */
  locale?: Locale;
  /** 筛选模式下的选择Options */
  searchOptions?: OptionsType;
  /** 筛选模式下的值 */
  filterData?: FilterDataProps;
  /** 筛选模式下的筛选字段 */
  filterTitle?: string;
  /** 字段列表高度 */
  listHeight?: number;
}

interface StateRefInterface {
  selected: string[];
}

interface FilterRefInterface {
  filterData: FilterListValueProps[][];
}

const generateLabelValList = (list: (string | null)[], emptyValText = '空值') => {
  return map(list, (it) =>
    isEmpty(it) ? { label: emptyValText, value: it } : isString(it) ? { label: it, value: it } : it,
  );
};

/**
 * 将多个空值汇聚成一个，加上剩下的list并返回
 * @param list 传入的list,可能是 (string | null)[]| LabelValueItemInterface[]
 * @param emptyValText 空值的显示label ，默认为空值
 * @returns
 */
const formatList = (
  list: (string | null)[] | LabelValueItemInterface[],
  emptyValText?: string,
): LabelValueItemInterface[] => {
  //以第一个item作为判断是string或者LabelValueItemInterface
  const firstItem = first(list as unknown[]);
  //如果是(string | null [])
  if (!get(firstItem, 'value')) {
    const compactList = filter(list, (it) => !isEmpty(it));
    const isExistFalseVal = compactList.length !== list.length;
    const allList = isExistFalseVal ? [null, ...compactList] : list;
    return generateLabelValList(
      allList as (string | null)[],
      emptyValText,
    ) as LabelValueItemInterface[];
  } else {
    const compactList = filter(list as LabelValueItemInterface[], (it) => !isEmpty(it.value));
    const isExistFalseVal = compactList.length !== list.length;
    const allList = isExistFalseVal ? [{ label: emptyValText, value: null }, ...compactList] : list;
    return allList as LabelValueItemInterface[];
  }
};

const { useState, useCallback, useMemo, useRef, useEffect } = React;

const defaultValues: string[] = [];
const defaultList: string[] = [];
const TextFilter: React.FC<TextFilterProps> = (props) => {
  const {
    values = defaultValues,
    list = defaultList,
    filterData,
    filterTitle,
    className,
    children,
    onOk,
    onClose,
    allSelectLabel,
    loading,
    emptyValText,
    radio,
    type,
    locale,
    listHeight,
    searchOptions,
    ...restProps
  } = props as TextFilterProps & typeof defaultProps;

  const trans = useMemo(() => (type && filterData ? translateFilterData(filterData) : []), [
    filterData,
    type,
  ]);

  const [_type, setType] = useState(type);

  const actualList = formatList(list, emptyValText);
  const isFilterMode = _type === TextFilterTypeSet.filter;

  const [fData, setFilterData] = useState(trans);
  const filterRef = useRef<FilterRefInterface>({ filterData: fData });
  filterRef.current = { filterData: fData };

  const [selected, setSelected] = useState(values);
  const stateRef = useRef<StateRefInterface>({ selected });
  stateRef.current = { selected };

  const handleConfim = useCallback(() => {
    onOk &&
      onOk(
        stateRef.current.selected,
        _type ? formatFilterData(filterRef.current.filterData) : undefined,
      );
  }, [onOk, _type]);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
    if (TextFilterTypeSet.standard) {
      setSelected(values);
    }
    if (TextFilterTypeSet.filter) {
      setFilterData(trans);
    }
  }, [onClose, trans, values]);

  useEffect(() => {
    setSelected(values);
  }, [values]);

  // =============== Render ===============

  const extraNode = useMemo(() => {
    return _type ? (
      <IconButton
        icon="maximize-2"
        style={{ marginLeft: '4px' }}
        onClick={() => {
          setType(TextFilterTypeSet.filter);
        }}
      />
    ) : undefined;
  }, [_type]);

  const overlay = useMemo(() => {
    return (
      <React.Fragment>
        {(!_type || _type === TextFilterTypeSet.standard) && (
          <CheckList
            size="compact"
            // type="menu-bg"
            loading={loading}
            onChange={setSelected}
            options={actualList as LabelValueItemInterface[]}
            value={selected}
            allSelectLabel={allSelectLabel}
            className={`${prefixCls}-checklist`}
            radio={radio}
            searchExtra={extraNode}
            listHeight={listHeight}
            showTip={true}
          />
        )}
        {_type && isFilterMode && (
          <div className={`${prefixCls}-filter`}>
            {filterTitle && <div>{filterTitle}</div>}
            <FilterList
              locale={locale}
              searchOptions={searchOptions}
              dataSource={fData}
              onChange={setFilterData}
            />
          </div>
        )}
      </React.Fragment>
    );
  }, [
    _type,
    loading,
    actualList,
    selected,
    allSelectLabel,
    radio,
    extraNode,
    isFilterMode,
    filterTitle,
    locale,
    searchOptions,
    fData,
    listHeight,
  ]);

  const cancelButtonProps: FilterButtonProps = { size: 'compact' };
  return (
    <CreateFilter
      onOk={handleConfim}
      overlay={overlay}
      onClose={handleClose}
      footerClassName={classNames({
        [`${prefixCls}-footer`]: true,
        [`${prefixCls}-footer-noBorder`]: isFilterMode,
      })}
      footerPrefixEl={() => {
        return (
          isFilterMode && (
            <LinkButton
              size="compact"
              className={`${prefixCls}-footer-btn`}
              onClick={() => {
                setType(TextFilterTypeSet.standard);
              }}
            >
              返回标准模式
            </LinkButton>
          )
        );
      }}
      okButtonProps={cancelButtonProps}
      cancelButtonProps={cancelButtonProps}
      className={classNames(prefixCls, className)}
      {...restProps}
      loading={false}
    >
      {children}
    </CreateFilter>
  );
};

TextFilter.displayName = 'TextFilter';
export default TextFilter;
const defaultProps = {
  allSelectLabel: '全选',
  placement: 'bottomLeft' as TooltipPlacement,
  emptyValText: '空值',
  locale: zhCn,
};
TextFilter.defaultProps = defaultProps;
const TextFilterMemo = React.memo(TextFilter);
TextFilterMemo.displayName = 'TextFilterMemo';
export { TextFilterMemo };
