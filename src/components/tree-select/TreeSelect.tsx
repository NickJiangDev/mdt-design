import * as React from 'react';
import RcTreeSelect, { TreeNode, SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from 'rc-tree-select';
import { IconType } from 'rc-tree/lib/interface';
import { CustomTagProps, FilterFunc } from 'rc-select/lib/interface/generator';
import {
  Key,
  DataNode,
  LabelValueType,
  SimpleModeConfig,
  ChangeEventExtra,
  LegacyDataNode,
} from 'rc-tree-select/lib/interface';
import { CheckedStrategy } from 'rc-tree-select/lib/utils/strategyUtil';
import { TreeNodeProps } from 'rc-tree';
import classNames from 'classnames';
import Tag from '../tag';
import CheckBoxDemo from '../checkbox';
import { SelectProps } from '../select';
import Icon from '../icon';
import { ObjectInterface } from '../_utils/interfaces';
import './style/index.less';

type RawValue = string | number;
export interface LabeledValue {
  key?: string;
  value: RawValue;
  label: React.ReactNode;
}
export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[];
export { SHOW_ALL, SHOW_PARENT, SHOW_CHILD };

export interface TreeSelectProps<ValueType = ObjectInterface>
  extends Omit<
    SelectProps,
    'inputIcon' | 'mode' | 'onChange' | 'options' | 'onSelect' | 'onDeselect' | 'onPopupScroll'
  > {
  /** 自定义的选择框后缀图标, 多选模式下必须同时设置 showArrow 为 true */
  suffixIcon?: React.ReactNode;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 设置 false 时关闭虚拟滚动 */
  virtual?: boolean;
  /** 方向 */
  direction?: 'ltr' | 'rtl';
  /** 支持多选 */
  multiple?: boolean;
  /** 是否显示 suffixIcon，单选模式下默认 true */
  showArrow?: boolean;
  /** 是否支持搜索框 */
  showSearch?: boolean;
  /** 打开 */
  open?: boolean;
  /** 默认打开 */
  defaultOpen?: boolean;
  /** 指定当前选中的条目 */
  value?: ValueType;
  /** 指定默认选中的条目 */
  defaultValue?: ValueType;
  /** 	是否禁用 */
  disabled?: boolean;
  /** 	选择框默认文字 */
  placeholder?: React.ReactNode;
  /** 搜索框的值，可以通过 onSearch 获取用户输入 */
  searchValue?: string;
  /** 当多选模式下值被选择，自动清空搜索框 */
  autoClearSearchValue?: boolean;
  /** Tag文案的最大长度 */
  maxTagTextLength?: number;
  /** 最多显示多少个 tag，响应式模式会对性能产生损耗 */
  maxTagCount?: number;
  /** 隐藏 tag 时显示的内容 */
  maxTagPlaceholder?: (omittedValues: LabelValueType[]) => React.ReactNode;
  /** 异步加载数据 */
  loadData?: (dataNode: LegacyDataNode) => Promise<unknown>;
  /** 输入项过滤对应的 treeNode 属性 */
  treeNodeFilterProp?: string;
  /** 作为显示的 prop 设置 */
  treeNodeLabelProp?: string;
  /** 使用简单格式的 treeData，具体设置参考可设置的类型 (此时 treeData 应变为这样的数据结构: [{id:1, pId:0, value:'1', title:"test1",...},...]， pId 是父节点的 id) */
  treeDataSimpleMode?: boolean | SimpleModeConfig;
  /** 设置展开的树节点 */
  treeExpandedKeys?: Key[];
  /** 默认展开的树节点 */
  treeDefaultExpandedKeys?: Key[];
  /** 加载过的树节点 */
  treeLoadedKeys?: Key[];
  /** 显示 Checkbox */
  treeCheckable?: boolean | React.ReactNode;
  /** checkable 状态下节点选择完全受控（父子节点选中状态不再关联），会使得 labelInValue 强制为 true */
  treeCheckStrictly?: boolean;
  /** showCheckedStrategy	配置 treeCheckable 时，定义选中项回填的方式。TreeSelect.SHOW_ALL: 显示所有选中节点(包括父节点)。TreeSelect.SHOW_PARENT: 只显示父节点(当父节点下所有子节点都选中时)。 默认只显示子节点 */
  showCheckedStrategy?: CheckedStrategy;
  /** 默认展开所有树节点 */
  treeDefaultExpandAll?: boolean;
  /** treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（value 在整个树范围内唯一） */
  treeData?: DataNode[];
  /** 是否展示线条样式 */
  treeLine?: boolean;
  /** 是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式 */
  treeIcon?: IconType;
  /** 展示treeicon */
  showTreeIcon?: boolean;
  /** 自定义树节点的展开/折叠图标 */
  switcherIcon?: IconType;
  treeMotion?: ObjectInterface;
  children?: React.ReactNode;
  /** 是否根据输入项进行筛选，默认用 treeNodeFilterProp 的值作为要筛选的 TreeNode 的属性值 */
  filterTreeNode?: boolean | FilterFunc<LegacyDataNode>;
  dropdownPopupAlign?: ObjectInterface;
  /** 搜索回调 */
  onSearch?: (value: string) => void;
  /** 变化回调 */
  onChange?: (value: ValueType, labelList: React.ReactNode[], extra: ChangeEventExtra) => void;
  /** 树结构展开回调 */
  onTreeExpand?: (expandedKeys: Key[]) => void;
  /** 树结构加载回调 */
  onTreeLoad?: (loadedKeys: Key[]) => void;
  /** full模式 */
  fullSelect?: boolean;
  /** 下拉列表滚动时的回调 */
  onPopupScroll?: React.UIEventHandler<HTMLDivElement>;
}

const SelectTag: React.FC<ObjectInterface> = React.memo((props) => {
  const { label, closable, onClose } = props;
  return <Tag tag={label} closable={closable} onClickClose={onClose} />;
});

const prefixCls = 'dmc-select';
const treeSelectPrefixCls = 'dmc-tree-select';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TreeSelect: React.FC<TreeSelectProps<any>> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectRef = React.useRef<any>();

  const {
    className,
    treeCheckable,
    switcherIcon,
    dropdownClassName,
    bordered,
    treeIcon,
    direction,
    tagRender,
    open,
    showSearch,
    fullSelect,
  } = props;

  const mergedDropdownClassName = classNames(dropdownClassName, `${treeSelectPrefixCls}-dropdown`, {
    [`${treeSelectPrefixCls}-dropdown-rtl`]: direction === 'rtl',
    [`${treeSelectPrefixCls}-full`]: fullSelect,
  });
  const mergedClassName = classNames(
    treeSelectPrefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-borderless`]: !bordered,
    },
    className,
  );

  let suffixIcon = <Icon icon="arrow-down" />;
  if (open && showSearch) {
    suffixIcon = <Icon icon="search" />;
  }

  const customerTagRender =
    tagRender ||
    (((props: CustomTagProps) => <SelectTag {...props} />) as (
      props: CustomTagProps,
    ) => React.ReactElement);

  const mixIcon = (props: TreeNodeProps) => {
    const checkboxDisabled = props.disabled || props.data?.disableCheckbox;
    const iconRender = typeof treeIcon === 'function' ? treeIcon(props) : treeIcon;
    return (
      <>
        {treeCheckable && (
          <CheckBoxDemo
            checked={props.checked}
            indeterminate={props.halfChecked}
            disabled={checkboxDisabled}
          />
        )}
        {iconRender}
      </>
    );
  };

  const otherProps = React.useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fullSelect: _, ...otherProps } = props;
    return otherProps;
  }, [props]);

  return (
    <RcTreeSelect
      {...otherProps}
      ref={selectRef}
      prefixCls={prefixCls}
      className={mergedClassName}
      inputIcon={suffixIcon}
      tagRender={customerTagRender}
      switcherIcon={
        switcherIcon ||
        ((nodeProps) => {
          const { isLeaf, expanded } = nodeProps;
          const icons = ['arrow-right', 'arrow-down'];
          return !isLeaf ? <Icon icon={icons[Number(!!expanded)]} /> : null;
        })
      }
      treeIcon={mixIcon}
      dropdownClassName={mergedDropdownClassName}
      allowClear={false}
    />
  );
};

TreeSelect.defaultProps = {
  virtual: true,
  fullSelect: false,
};

const TreeSelectMemo = React.memo(TreeSelect);
TreeSelectMemo.displayName = 'TreeSelectMemo';
export { TreeSelectMemo, TreeNode };

TreeSelect.displayName = 'TreeSelect';
export default TreeSelect;
