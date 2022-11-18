import * as React from 'react';
import RcSelect, { Option } from 'rc-select';
import { LabelValueType, CustomTagProps, SingleType } from 'rc-select/lib/interface/generator';
import {
  RenderNode,
  OptionsType,
  Mode,
  RenderDOMFunc,
  OptionData,
  OptionGroupData,
} from 'rc-select/lib/interface';
import { MenuItemProps } from 'rc-menu/lib/MenuItem';
import useStaticCallback from '@/hooks/useStaticCallback';
import classNames from 'classnames';
import findIndex from 'lodash/findIndex';
import filter from 'lodash/filter';
import { CheckboxMemo } from '../checkbox';
import Icon from '../icon';
import { ObjectInterface } from '../_utils/interfaces';
import Tag from '../tag';
import VirtualizedList, { ItemViewProps } from '../virtualized-list';
import { OnScrollParams } from 'react-virtualized';
import './style/index.less';
import Tooltip, { TooltipPlacement } from '../tooltip';

export const prefixCls = 'dmc-select';
export const LIST_MAX_HEIGHT = 300;

export const multiItemSelectedIcon = (props: MenuItemProps) => (
  <CheckboxMemo size="compact" checked={props.isSelected} disabled={props.disabled} />
);
export const singleItemIcon = (
  <Icon icon="done-check" className={`${prefixCls}-item-option-state-icon`} />
);

export const formateVal = (val: OptionData | OptionGroupData, valueKey = 'value') => {
  return typeof val === 'object'
    ? Array.isArray(val)
      ? val.map((v) => (typeof v === 'object' ? v[valueKey] : v))
      : [val[valueKey]]
    : [val];
};

export const getCustomerSelectedIcon = (menuItemSelectedIcon: RenderNode, isMulti: boolean) => {
  return isMulti
    ? menuItemSelectedIcon ||
        ((selectedProps: MenuItemProps) => multiItemSelectedIcon(selectedProps))
    : menuItemSelectedIcon || singleItemIcon;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SelectProps<ValueType = any> {
  /** id标识 */
  id?: string;
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 配置项 */
  options?: OptionsType;
  children?: React.ReactNode;
  /** 选择器的模式 */
  mode?: Mode;
  /** 指定当前选中的条目，多选时为一个数组。 */
  value?: ValueType;
  /** 指定默认选中的条目 */
  defaultValue?: ValueType;
  /** 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 { value: string, label: ReactNode } 的格式 */
  labelInValue?: boolean;
  /** 控制搜索文本 */
  searchValue?: string;
  /** 使单选模式可搜索 */
  showSearch?: boolean;
  /** 自动清除搜索信息 */
  autoClearSearchValue?: boolean;
  /** 文本框值变化时回调 */
  onSearch?: (value: string) => void;
  /** 支持清除 */
  allowClear?: boolean;
  /** 清除图标 */
  clearIcon?: React.ReactNode;
  /** 是否显示下拉小箭头 */
  showArrow?: boolean;
  /** 输入框图标 */
  inputIcon?: RenderNode;
  /** 自定义的多选框清除图标 */
  removeIcon?: React.ReactNode;
  /** 自定义多选时当前选中的条目图标 */
  menuItemSelectedIcon?: RenderNode;
  /** 是否展开下拉菜单 */
  open?: boolean;
  /** 默认是否展开下拉菜单 */
  defaultOpen?: boolean;
  /** 设置弹窗滚动高度 */
  listHeight?: number;
  /** 设置选项高度 */
  listItemHeight?: number;
  /** 下拉菜单的 style 属性 */
  dropdownStyle?: React.CSSProperties;
  /** 下拉菜单的类名 */
  dropdownClassName?: string;
  /** 下拉菜单和选择器同宽。默认将设置 min-width，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动 */
  dropdownMatchSelectWidth?: boolean | number;
  /** 自定义下拉框内容 */
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
  /** 覆盖默认的定位配置 */
  dropdownAlign?: ObjectInterface;
  /** 菜单渲染父节点。默认渲染到 body 上 */
  getPopupContainer?: RenderDOMFunc;
  /** 下拉菜单的方向 */
  direction?: string;
  /** 失效状态 */
  disabled?: boolean;
  /** 加载样式 */
  loading?: boolean;
  /** 自动聚焦 */
  autoFocus?: boolean;
  /** 当下拉列表为空时显示的内容 */
  notFoundContent?: React.ReactNode;
  /** 选择框默认文本 */
  placeholder?: React.ReactNode;
  /** 回填到选择框的 Option 的属性值 */
  optionLabelProp?: string;
  /** 最大显示的 tag 文本长度 */
  maxTagTextLength?: number;
  /** 最多显示多少个 tag */
  maxTagCount?: number;
  /** 隐藏 tag 时显示的内容 */
  maxTagPlaceholder?: React.ReactNode | ((omittedValues: LabelValueType[]) => React.ReactNode);
  /** 自定义 tag 内容 render，仅在 mode 为 multiple 或 tags 时生效 */
  tagRender?: (props: CustomTagProps) => React.ReactElement;
  /** 指示其元素是否可以聚焦 */
  tabIndex?: number;
  onKeyUp?: React.KeyboardEventHandler<HTMLDivElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  /** 下拉列表滚动时的回调 */
  onPopupScroll?: (params: OnScrollParams) => void;
  /** 展开下拉菜单的回调 */
  onDropdownVisibleChange?: (open: boolean) => void;
  /** 被选中时调用，参数为选中项的 value (或 key) 值 */
  onSelect?: (value: SingleType<ValueType>, option: OptionsType[number]) => void;
  /** 取消选中时调用，参数为选中项的 value (或 key) 值，仅在 multiple 或 tags 模式下生效 */
  onDeselect?: (value: SingleType<ValueType>, option: OptionsType[number]) => void;
  /** 按键按下时回调 */
  onInputKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  /** 点击回调 */
  onClick?: React.MouseEventHandler;
  /** 选中 option，或 input 的 value 变化时，调用此函数 */
  onChange?: (value: ValueType, option: OptionsType[number] | OptionsType) => void;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  /** 类型 */
  type?: 'assist-bg' | 'menu-bg';
  /** 大小 */
  size?: 'compact' | 'mini';
  /** label关键字 */
  labelKey?: string;
  /** value关键字 */
  valueKey?: string;
  /** 最大高度 */
  maxHeight?: number;
  /** 需要撑满当前宽度 */
  block?: boolean;
  /** 仅对createSelect有效 */
  getNewOptionTemp?: (value: string) => React.ReactNode;
  /** 创建新标签 */
  createAble?: boolean;
  // 情景1 - true（默认）:外部 options 始终不变，但是需要基于此做新增
  // 情景2 - false: 外部 options 变化，需要优先于外部状态
  /** 自动将新增的 Option 添加到当前组件中 */
  autoCreateItem?: boolean;
  /** 校验规则 */
  addValFormatter?: (value: string) => string | number | undefined;
  /** 是否显示tip提示 */
  showTip?: boolean;
  /** 气泡框位置 */
  tipPlacement?: TooltipPlacement;
}

export const SelectTag: React.FC<ObjectInterface> = React.memo((props) => {
  const { label, closable, onClose, color = 'grey-blue-400' } = props;
  return <Tag tag={label} closable={closable} onClickClose={onClose} color={color} />;
});

const ViewItem = React.memo<ItemViewProps & { showTip?: boolean; tipPlacement?: TooltipPlacement }>(
  ({
    item,
    className,
    style,
    labelKey,
    valueKey,
    actualVal,
    onSelectChange,
    customerSelectedIcon,
    isMulti,
    showTip,
    tipPlacement,
  }) => {
    const selected = actualVal.includes(item[valueKey]);
    const itemCls = classNames(`${prefixCls}-item`, `${prefixCls}-item-option`, className, {
      [`${prefixCls}-item-option-selected`]: selected,
      [`${prefixCls}-item-option-disabled`]: item.disabled,
    });
    const isFlag = (selected && !isMulti) || isMulti;

    const onClick = React.useCallback(() => {
      if (item.disabled) {
        return;
      }
      onSelectChange(item);
    }, [item, onSelectChange]);

    const dom = (
      <div style={{ ...style }} className={itemCls} key={item[valueKey]} onClick={onClick}>
        <>
          {isFlag && (
            <span className={`${prefixCls}-item-option-state`}>
              {typeof customerSelectedIcon === 'function'
                ? customerSelectedIcon({ isSelected: selected, disabled: item.disabled })
                : customerSelectedIcon}
            </span>
          )}
          <div className={`${prefixCls}-item-option-content`}>{item[labelKey]}</div>
        </>
      </div>
    );
    return (
      <>
        {showTip ? (
          <Tooltip overlay={item[labelKey]} placement={tipPlacement}>
            {dom}
          </Tooltip>
        ) : (
          dom
        )}
      </>
    );
  },
);

const Select: React.FC<SelectProps> = (props) => {
  const {
    type,
    size,
    className,
    mode,
    menuItemSelectedIcon,
    inputIcon,
    dropdownClassName,
    tagRender,
    labelKey,
    valueKey,
    options,
    value,
    onSearch,
    dropdownRender,
    onChange,
    notFoundContent,
    open,
    defaultOpen,
    showSearch,
    onSelect,
    loading,
    getNewOptionTemp,
    block,
    onDeselect,
    createAble,
    onBlur,
    autoCreateItem,
    addValFormatter,
    defaultValue,
    onDropdownVisibleChange,
    onPopupScroll,
    allowClear,
    clearIcon,
    showTip,
    tipPlacement,
    ...restProps
  } = props as SelectProps & typeof defaultProps;

  const [unConTrolVal, setUnTrolVal] = React.useState<string[]>(defaultValue ? [defaultValue] : []);
  const isControl = 'value' in props;
  const actualVal = isControl ? formateVal(!value && value !== 0 ? [] : value) : unConTrolVal;
  const [actualOpen, setOpen] = React.useState(open || defaultOpen);
  const [filterVal, setFilterVal] = React.useState('');
  const [newOptions, setNewOptions] = React.useState<OptionsType>([]);
  const [showCreate, setShowCreate] = React.useState(false);

  const _allowClear = React.useMemo(() => (actualVal.length ? allowClear : false), [
    actualVal,
    allowClear,
  ]);

  const _clearIcon = clearIcon || <Icon icon="clear" className={`${prefixCls}-arrow-icon`} />;

  const allOptions = React.useRef<OptionsType>([]);
  allOptions.current = autoCreateItem ? [...options, ...newOptions] : options;

  const [filterOptions, setFilterOptions] = React.useState(allOptions.current);
  const isMulti = mode === 'multiple';

  React.useEffect(() => {
    setFilterOptions(allOptions.current);
  }, [options]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectRef = React.useRef<any>(null);

  const dropdownCls = classNames(`${prefixCls}-dropdown`, dropdownClassName, {
    [`${prefixCls}-${type}-dropdown`]: type,
  });
  const selectCls = classNames(
    {
      [`${prefixCls}-create-select-single`]: !isMulti && createAble,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-block`]: block,
    },
    className,
  );

  const actualInputIcon = inputIcon || (
    <Icon icon="arrow-down" className={`${prefixCls}-arrow-icon`} />
  );

  const customerSelectedIcon = getCustomerSelectedIcon(menuItemSelectedIcon, isMulti);
  const customerTagRender =
    tagRender ||
    ((props: ObjectInterface) => {
      return <SelectTag {...props} onClose={() => onSelectChange(props)} />;
    });

  const onSelectChange = React.useCallback(
    (item) => {
      const value = item[valueKey];
      const val = isMulti
        ? actualVal.includes(value)
          ? actualVal.filter((v) => v !== value)
          : [...actualVal, value]
        : [value];
      setUnTrolVal(val);
      setFilterOptions(allOptions.current);
      onSelect && onSelect(value, item);
      onChange &&
        onChange(
          isMulti ? val : value,
          allOptions.current.filter((v) => val.includes(v[valueKey])),
        );
      !mode && setOpen(false);
    },
    [actualVal, isMulti, mode, onChange, onSelect, valueKey],
  );

  const onInputSearch = React.useCallback(
    (value: string) => {
      const currentOptions = value
        ? allOptions.current.filter((option) => option[labelKey].includes(value))
        : allOptions.current;
      // 如果没有完全匹配，则为模糊搜索的结果
      // 此时如果是create able，需要新建标签
      const show =
        createAble && value && !allOptions.current.find((option) => value === option[labelKey]);
      setShowCreate(!!show);
      onSearch && onSearch(value);
      setFilterOptions(currentOptions);
      setFilterVal(value);
    },
    [labelKey, onSearch, createAble],
  );

  const itemExtraProps = React.useMemo(
    () => ({
      labelKey,
      valueKey,
      actualVal,
      onSelectChange,
      customerSelectedIcon,
      isMulti,
    }),
    [actualVal, customerSelectedIcon, isMulti, labelKey, onSelectChange, valueKey],
  );
  const newOptionCls = classNames(
    `${prefixCls}-item`,
    `${prefixCls}-item-option`,
    `${prefixCls}-item-new-option`,
  );

  const _onChange = React.useCallback(
    (value, option) => {
      // clear
      if (!value) {
        setUnTrolVal([]);
        return;
      }
      const onlyValue = value[value.length - 1];
      const onlyOpt = option[option.length - 1] || option;
      const newOption: OptionData | OptionGroupData = {
        label: onlyValue,
        value: onlyValue,
        key: onlyValue,
      };

      const val = isMulti ? value : filterVal ? [filterVal] : onlyValue ? [onlyValue] : [];
      const opt = isMulti
        ? option
        : filterVal
        ? allOptions.current.filter((it) => it[valueKey] === filterVal)
        : onlyOpt
        ? [onlyOpt]
        : [];
      setUnTrolVal(val);
      setNewOptions((prevOptions) =>
        filter([...prevOptions, newOption], (option) => !!option[valueKey]),
      );
      setFilterOptions([...allOptions.current, newOption]);

      if (!isMulti) {
        setOpen(false);
        selectRef.current?.blur();
      }
      onSelect && onSelect(value[value.length - 1], onlyOpt);
      onChange && onChange(val, opt);
    },
    [filterVal, isMulti, onChange, onSelect, valueKey],
  );

  const addOption = React.useCallback(() => {
    const v = addValFormatter ? addValFormatter(filterVal) : filterVal;
    if (v === undefined || v === null) return;
    const newOption: OptionData | OptionGroupData = {
      label: filterVal,
      value: v,
      key: filterVal,
    };
    const val = isMulti ? [...actualVal, v] : [v];
    const opt = [...allOptions.current.filter((it) => val.includes(it[valueKey])), newOption];
    setUnTrolVal(val);
    setNewOptions((prevOptions) =>
      filter([...prevOptions, newOption], (option) => !!option[valueKey]),
    );
    setFilterOptions([...allOptions.current, newOption]);
    if (!isMulti) {
      setOpen(false);
      selectRef.current?.blur();
    }
    onSelect && onSelect(filterVal, newOption);
    onChange && onChange(isMulti ? val : val[0], opt);
  }, [actualVal, addValFormatter, filterVal, isMulti, onChange, onSelect, valueKey]);

  const addOptionNode = React.useMemo(() => {
    return (
      <div key="newOption" className={newOptionCls} onClick={addOption}>
        <Icon icon="add" className={`${prefixCls}-item-option-state-icon`} />
        <div className={`${prefixCls}-item-new-option-content`}>
          {getNewOptionTemp ? getNewOptionTemp(filterVal) : filterVal}
        </div>
      </div>
    );
  }, [addOption, filterVal, getNewOptionTemp, newOptionCls]);

  const _dropdownRender = (menu: React.ReactElement) => {
    // step1: loading status check
    if (loading) {
      return (
        <div className={`${prefixCls}-dropdown-loading`}>
          <Icon icon="loading" />
        </div>
      );
    }
    // step2: render
    if (filterOptions.length === 0 && createAble) {
      return <>{addOptionNode}</>;
    }
    if (dropdownRender) {
      return (
        <>
          {dropdownRender(menu)}
          {showCreate && addOptionNode}
        </>
      );
    }
    // 每次打开始终回到顶部，解决虚拟滚动留白的问题
    const _scrollTop = actualOpen ? undefined : 0;
    return (
      <>
        <VirtualizedList
          scrollTop={_scrollTop}
          data={filterOptions}
          ItemView={(rest) => <ViewItem showTip={showTip} tipPlacement={tipPlacement} {...rest} />}
          noRowsRenderer={() => notFoundContent as JSX.Element}
          maxHeight={LIST_MAX_HEIGHT}
          itemViewProps={itemExtraProps}
          type={type}
          onScroll={onPopupScroll}
        />
        {showCreate && addOptionNode}
      </>
    );
  };

  const _onDeselect = React.useCallback(
    (value, option) => {
      const newIndex = findIndex(newOptions, { value });
      if (newIndex > -1) {
        setNewOptions((prevOptions) => filter(prevOptions, (option) => option[valueKey] !== value));
        setFilterOptions(filter(allOptions.current, (option) => option[valueKey] !== value));
      }
      onDeselect && onDeselect(value, option);
    },
    [newOptions, onDeselect, valueKey],
  );

  const _onDropdownVisibleChange = React.useCallback(
    (open) => {
      setOpen(open);
      onDropdownVisibleChange && onDropdownVisibleChange(open);
    },
    [onDropdownVisibleChange, setOpen],
  );

  const _blur = useStaticCallback((v) => {
    if (!actualOpen) {
      setFilterVal('');
      setFilterOptions(allOptions.current);
    }
    onBlur && onBlur(v);
  });

  const searchAble = showSearch || createAble;

  return (
    <>
      <RcSelect
        {...restProps}
        prefixCls={prefixCls}
        className={selectCls}
        inputIcon={actualInputIcon}
        dropdownClassName={dropdownCls}
        mode={mode}
        tagRender={customerTagRender}
        menuItemSelectedIcon={menuItemSelectedIcon ?? customerSelectedIcon}
        value={actualVal}
        open={actualOpen}
        options={allOptions.current}
        onSearch={searchAble ? onInputSearch : undefined}
        showSearch={searchAble}
        onDeselect={_onDeselect}
        onChange={_onChange}
        onDropdownVisibleChange={_onDropdownVisibleChange}
        loading={loading}
        dropdownRender={_dropdownRender}
        onBlur={_blur}
        ref={selectRef}
        allowClear={_allowClear}
        clearIcon={_clearIcon}
      />
    </>
  );
};
const defaultProps = {
  createAble: false,
  labelKey: 'label',
  valueKey: 'value',
  options: [],
  autoCreateItem: true,
};
Select.defaultProps = defaultProps;

const SelectMemo = React.memo(Select);
SelectMemo.displayName = 'SelectMemo';
export { SelectMemo, Option };

Select.displayName = 'Select';
export default Select;
