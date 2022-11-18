import * as React from 'react';
import { useEffect } from 'react';
import classNames from 'classnames';
import { getFullChars } from '../_utils/pinyinUtil';
import useStaticCallback from '@/hooks/useStaticCallback';
import { LabelValueItemInterface } from '../_utils/interfaces';
import formateOptions from '../_utils/formateOptions';
import { ObjectInterface } from '../_utils/interfaces';
import Input from '../input';
import Spin from '../spin';
import Checkbox from '../checkbox';
import VirtualizedList, { ItemViewProps } from '../virtualized-list';
import './style/check-list.less';
import FieldItem from '@/components/field-item';
import Tooltip from '@/components/tooltip';

export interface CheckListProps {
  /** 搜索栏的显隐 */
  hideSearch?: boolean;
  /** 类型 */
  type?: 'assist-bg' | 'menu-bg';
  /** 单元的展示模式 */
  mode?: 'plain' | 'normal';
  /** 列表单选(使用allSelectLabel后该属性失效) */
  radio?: boolean;
  /** 设置搜索框的大小 */
  size?: 'compact';
  /** 设置列表的标题 */
  text?: React.ReactNode;
  /** 设置列表高度 */
  listHeight?: number;
  /** 列表加载 */
  loading?: boolean;
  /** 绑定值 */
  value?: string[];
  /** 默认绑定值 */
  defaultValue?: string[];
  /** 提供全选的功能，传入文案即拥有此功能 */
  allSelectLabel?: React.ReactNode;
  /** 选择项，可直接传字符串数组或者对象数组 */
  options?: (LabelValueItemInterface | string)[];
  /** 选项变化时的回调函数 */
  onChange?: (selected: string[]) => void;
  /** 类名 */
  className?: string;
  /** 列表单元的类名 */
  itemClassName?: string;
  /** 标题类名 */
  listDescriptionClassName?: string;
  /** 列表label字段的关键值 */
  labelKey?: string;
  /** 列表value字段的关键值 */
  valueKey?: string;
  /** 列表的最大高度 */
  maxHeight?: number;
  /** 每一列的高度 */
  rowHeight?: number;
  /** 是否自适应高度（会使最大高度失效） */
  flexHeight?: boolean;
  /** 列表空状态显示 */
  noContentText?: string;
  /** 搜索条件未命中显示 */
  noResultText?: string;
  /** 搜索占位 */
  placeholder?: string;
  /** 列表筛选 */
  filterList?: (options: LabelValueItemInterface, search: string) => LabelValueItemInterface[];
  /** 列筛选 */
  filterItem?: (val: LabelValueItemInterface, search: string) => boolean;
  /** 自定义渲染列显示 */
  renderer?: (
    checked: boolean,
    title: string,
    value: string,
    item: ObjectInterface,
  ) => React.ReactNode;
  /** 列表勾选框显隐 */
  showCheckbox?: boolean;
  /** 列表动态高度（同Table） */
  dynamicRowHeight?: boolean;
  /** 列高度最小值 */
  minRowHeight?: number;
  /** 搜索后缀 */
  searchExtra?: React.ReactNode;
  /** 是否显示tip提示 */
  showTip?: boolean;
}

// interface StateRefInterface {
//   selected: string[];
//   searchList: string[];
// }

const prefixCls = 'dmc-check-list';

const defaultProps = {
  maxHeight: 330,
  rowHeight: 36,
  options: [],
  valueKey: 'value',
  labelKey: 'label',
  // value: [],
  defaultValue: [],
};

const plainRowRenderer = (
  checked: boolean,
  title: string,
  _value: string,
  item: ObjectInterface,
  index: number,
) => {
  return (
    <div className={`${prefixCls}-plain-row-wrap`}>
      <FieldItem key={index} type={item.type} name={title} checked={checked} />
    </div>
  );
};

const CheckList: React.FC<CheckListProps> = (props) => {
  const {
    hideSearch,
    type,
    mode,
    text,
    size,
    listHeight,
    flexHeight,
    loading,
    options,
    valueKey,
    labelKey,
    value,
    defaultValue,
    allSelectLabel,
    className,
    listDescriptionClassName,
    onChange,
    maxHeight,
    noContentText,
    noResultText,
    placeholder,
    filterList,
    filterItem,
    rowHeight,
    renderer,
    radio,
    showCheckbox,
    dynamicRowHeight,
    minRowHeight,
    searchExtra,
    showTip,
    ...restProps
  } = props as CheckListProps & typeof defaultProps;
  const [search, setSearch] = React.useState('');
  const [unControlVal, setUnControlVal] = React.useState(defaultValue as string[]);
  const opts = React.useMemo(() => formateOptions(options, labelKey, valueKey), [
    options,
    labelKey,
    valueKey,
  ]);
  const pinyinOpts = React.useMemo(
    () =>
      opts.map((opt) =>
        getFullChars(typeof opt === 'string' ? opt : opt?.[labelKey] || '').toLowerCase(),
      ),
    [opts, labelKey],
  );
  const searchList = React.useMemo(() => {
    if (filterList) {
      return filterList(opts, search);
    }
    return search
      ? filterItem
        ? opts.filter((t) => filterItem(t, search))
        : opts.filter(
            (t, index) =>
              `${t[labelKey]} || ''`.includes(search) ||
              pinyinOpts[index].includes(search.toLowerCase()),
          )
      : opts;
  }, [search, filterList, opts, filterItem, labelKey, pinyinOpts]);
  const isControl = 'value' in props;
  const val = isControl ? (radio ? (value || []).slice(0, 1) : value || []) : unControlVal;
  const sLen = searchList.length;
  const checkedAll = sLen > 0 && searchList.every((it) => val.includes(it[valueKey]));
  const indeterminate = sLen > 0 && searchList.some((it) => val.includes(it[valueKey]));

  useEffect(() => {
    if (radio && Array.isArray(value) && value.length > 1) {
      console.warn('the length of value is at most one when using radio');
    }
    if (allSelectLabel && radio) {
      console.warn('do not using allSelectLabel with radio');
    }
  }, [value, radio, allSelectLabel]);

  const onInputChange = useStaticCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearch(value);
  });

  const onCheckAllChange = useStaticCallback((checked: boolean) => {
    if (!searchList.length) return;

    const sk = searchList.map((it) => it[valueKey]);
    const newVal = checked
      ? Array.from(new Set([...val, ...sk]))
      : val.filter((it) => !sk.includes(it));
    !isControl && setUnControlVal(newVal);
    onChange && onChange(newVal);
  });

  const onCheckChange = useStaticCallback((checked: boolean, key: string) => {
    let newVal: string[];
    if (radio) {
      newVal = checked ? [key] : [];
    } else {
      newVal = checked ? [...val, key] : val.filter((it) => it !== key);
    }
    !isControl && setUnControlVal(newVal);
    onChange && onChange(newVal);
  });

  const cls = classNames(className, `${prefixCls}`, {
    [`${prefixCls}-flex-height`]: flexHeight,
    [`${prefixCls}-${type}`]: type,
  });

  const rowRenderer = ({ item, style, index }: ItemViewProps) => {
    const checked = val.includes(item[valueKey]);
    const checkBoxProps = {
      type,
      icon: !item.children && item.icon,
      className: `${prefixCls}-checkbox`,
      checked: !!checked,
      value: item[valueKey],
      onChange: onCheckChange,
      disabled: item.disabled,
    };
    const title = item[labelKey];
    if (renderer || mode === 'plain') {
      // priority
      const _renderer = renderer || plainRowRenderer;
      const ele = (
        <div
          style={style}
          className={classNames(`${prefixCls}-list-item`, {
            [`${prefixCls}-list-item-gap`]: mode === 'plain',
          })}
          onClick={() => {
            onCheckChange(!checked, item[valueKey]);
          }}
        >
          {showCheckbox && <Checkbox {...checkBoxProps} size="compact" key={index} />}
          {_renderer(checked, item[labelKey], item[valueKey], item, index)}
        </div>
      );
      return showTip ? (
        <Tooltip title={title} trigger={'hover'} placement="bottom">
          {ele}
        </Tooltip>
      ) : (
        ele
      );
    }
    const ele = (
      <div style={style} className={`${prefixCls}-list-item`}>
        <Checkbox {...checkBoxProps} size="compact" title={item[labelKey]} key={index} />
      </div>
    );
    return showTip ? (
      <Tooltip title={title} trigger={'hover'} placement="bottom">
        {ele}
      </Tooltip>
    ) : (
      ele
    );
  };

  const noRowsRenderer = () => {
    const text = !opts.length ? noContentText : noResultText;
    return <div className={`${prefixCls}-no-content`}>{text}</div>;
  };

  return (
    <div {...restProps} className={cls}>
      <div
        className={classNames(`${prefixCls}-wrap`, {
          [`${prefixCls}-plain`]: mode === 'plain',
        })}
      >
        {!hideSearch && (
          <div className={`${prefixCls}-search`}>
            <Input
              value={search}
              block
              allowClear
              type={type}
              size={size}
              prefixIcon="search"
              placeholder={placeholder}
              className={`${prefixCls}-search-input`}
              onChange={onInputChange}
            />
            {searchExtra}
          </div>
        )}
        {loading ? (
          <div className={`${prefixCls}-icon-wrap`}>
            <Spin className={`${prefixCls}-icon-loading`} />
          </div>
        ) : (
          <div className={`${prefixCls}-list`}>
            {!!text && (
              <div className={`${prefixCls}-list-description ${listDescriptionClassName || ''}`}>
                {text}
              </div>
            )}
            {!!allSelectLabel && !!!radio && (
              <Checkbox
                size="compact"
                title={allSelectLabel}
                type={type}
                checked={checkedAll}
                onChange={onCheckAllChange}
                indeterminate={indeterminate}
                className={`${prefixCls}-checkbox`}
              />
            )}
            <VirtualizedList
              minRowHeight={minRowHeight}
              dynamicRowHeight={dynamicRowHeight}
              height={listHeight}
              type={type}
              data={searchList}
              rowHeight={mode === 'plain' ? 30 : rowHeight}
              ItemView={rowRenderer}
              className={`${prefixCls}-virtual-list`}
              noRowsRenderer={noRowsRenderer}
              maxHeight={flexHeight ? undefined : listHeight ? listHeight : maxHeight}
            />
          </div>
        )}
      </div>
    </div>
  );
};

CheckList.defaultProps = defaultProps;

CheckList.displayName = 'CheckList';
export default CheckList;

const CheckListMemo = React.memo(CheckList);
CheckListMemo.displayName = 'CheckListMemo';
export { CheckListMemo };
