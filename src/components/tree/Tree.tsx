import * as React from 'react';
import RcTree, {
  TreeNode as RcTreeNode,
  TreeProps as RcTreeProps,
  TreeNodeProps as RcTreeNodeProps,
} from 'rc-tree';
import classNames from 'classnames';
import { Key, DataNode } from 'rc-tree/lib/interface';
import useMeasure from 'react-use/lib/useMeasure';
import CheckBoxDemo from '../checkbox';
import Icon from '../icon';
import { ObjectInterface } from '../_utils/interfaces';
import size from 'lodash/size';
import './style/tree.less';
import { useCallback, useRef, useImperativeHandle } from 'react';
import dropIndicatorRender from './dropIndicator';

export interface TreeNodeAttribute {
  eventKey: string;
  prefixCls: string;
  className: string;
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  halfChecked: boolean;
  children: React.ReactNode;
  title: React.ReactNode;
  pos: string;
  dragOver: boolean;
  dragOverGapTop: boolean;
  dragOverGapBottom: boolean;
  isLeaf: boolean;
  selectable: boolean;
  disabled: boolean;
  disableCheckbox: boolean;
}

export interface TreeNodeProps extends ObjectInterface {
  className?: string;
  checkable?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  title?: string | React.ReactNode;
  key?: Key;
  eventKey?: string;
  isLeaf?: boolean;
  checked?: boolean;
  expanded?: boolean;
  loading?: boolean;
  selected?: boolean;
  selectable?: boolean;
  icon?: ((treeNode: TreeNodeAttribute) => React.ReactNode) | React.ReactNode;
  children?: React.ReactNode;
}

export type TreeNodeType = React.Component<TreeNodeProps, ObjectInterface>;

export interface TreeProps extends Omit<RcTreeProps, 'prefixCls'> {
  showLine?: boolean;
  className?: string;
  /** 是否支持多选 */
  multiple?: boolean;
  /** 是否自动展开父节点 */
  autoExpandParent?: boolean;
  /** checkable状态下节点选择完全受控（父子节点选中状态不再关联） */
  checkStrictly?: boolean;
  /** 是否支持选中 */
  checkable?: boolean;
  /** 是否禁用树 */
  disabled?: boolean;
  /** 默认展开所有树节点 */
  defaultExpandAll?: boolean;
  /** 默认展开对应树节点 */
  defaultExpandParent?: boolean;
  /** 默认展开指定的树节点 */
  defaultExpandedKeys?: Key[];
  /** （受控）展开指定的树节点 */
  expandedKeys?: Key[];
  /** （受控）选中复选框的树节点 */
  checkedKeys?: Key[] | { checked: Key[]; halfChecked: Key[] };
  /** 默认选中复选框的树节点 */
  defaultCheckedKeys?: Key[];
  /** （受控）设置选中的树节点 */
  selectedKeys?: Key[];
  /** 默认选中的树节点 */
  defaultTreeedKeys?: Key[];
  selectable?: boolean;
  /** 点击树节点触发 */
  filterDmcTreeNode?: (node: TreeNodeType) => boolean;
  loadedKeys?: Key[];
  /** 设置节点可拖拽（IE>8） */
  draggable?: ((node: DataNode) => boolean) | boolean;
  style?: React.CSSProperties;
  showIcon?: boolean;
  icon?: ((nodeProps: RcTreeNodeProps) => React.ReactNode) | React.ReactNode;
  switcherIcon?: React.ReactNode | ((nodeProps: TreeNodeProps) => React.ReactNode);
  prefixCls?: string;
  children?: React.ReactNode;
  blockNode?: boolean;
  virtual?: boolean;
  direction?: 'ltr' | 'rtl';
  fullSelect?: boolean;
  type?: 'assist-bg';
  //是否有选中效果
  withoutSelectEffect?: boolean;
  withoutHoverEffect?: boolean;
  emptyContent?: React.ReactNode;
}

export interface DmcTreeRef {
  treeComponent: RcTree | null;
  componentWrapper: HTMLDivElement | null;
}

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<TreeProps & React.RefAttributes<DmcTreeRef>> {
  TreeNode: typeof RcTreeNode;
}

const prefixCls = 'dmc-tree';

const Tree = React.forwardRef<DmcTreeRef, TreeProps>((props, treeRef) => {
  const {
    className,
    showIcon,
    switcherIcon,
    blockNode,
    children,
    checkable,
    direction,
    icon,
    fullSelect,
    height,
    type,
    withoutSelectEffect,
    itemHeight,
    style,
    emptyContent,
    treeData,
    withoutHoverEffect,
    ...restProps
  } = props;

  const [measureRefCallback, { height: eleHeight }] = useMeasure<HTMLDivElement>();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rcTreeRef = useRef<RcTree | null>(null);

  const wrapperRefCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        measureRefCallback(node);
      }
      wrapperRef.current = node;
    },
    [measureRefCallback],
  );

  const rcTreeRefCallback = useCallback((node: RcTree | null) => {
    rcTreeRef.current = node;
  }, []);

  const mixIcon = (props: RcTreeNodeProps) => {
    const checkboxDisabled = props.disabled || props.data?.disableCheckbox;
    const iconRender = typeof icon === 'function' ? icon(props as TreeNodeAttribute) : icon;

    return (
      <>
        {checkable && (
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

  const treeStyle = React.useMemo(() => {
    return itemHeight ? { ...style, lineHeight: `${itemHeight - 6}px` } : style;
  }, [itemHeight, style]);

  const cls = classNames(className, {
    [`${prefixCls}-icon-hide`]: !showIcon,
    [`${prefixCls}-block-node`]: blockNode,
    [`${prefixCls}-checkable`]: checkable,
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-full`]: fullSelect,
    [`${prefixCls}-without-select-effect`]: withoutSelectEffect,
    [`${prefixCls}-without-hover-effect`]: withoutHoverEffect,
    [`${prefixCls}-${type}`]: type,
  });

  useImperativeHandle(treeRef, () => ({
    treeComponent: rcTreeRef.current,
    componentWrapper: wrapperRef.current,
  }));

  return (
    <div className={`${prefixCls}-wrapper`} style={{ height }} ref={wrapperRefCallback}>
      {size(treeData) === 0 && emptyContent
        ? emptyContent
        : eleHeight && (
            <RcTree
              {...restProps}
              style={treeStyle}
              ref={rcTreeRefCallback}
              treeData={treeData}
              height={eleHeight}
              prefixCls={prefixCls}
              className={cls}
              checkable={checkable}
              icon={mixIcon}
              itemHeight={itemHeight}
              dropIndicatorRender={dropIndicatorRender}
              switcherIcon={
                switcherIcon ||
                ((nodeProps: TreeNodeProps) => {
                  const { isLeaf, expanded } = nodeProps;
                  const icons = ['arrow-right', 'arrow-down'];
                  return !isLeaf ? <Icon icon={icons[Number(!!expanded)]} /> : null;
                })
              }
            >
              {children}
            </RcTree>
          )}
    </div>
  );
}) as CompoundedComponent;

Tree.defaultProps = {
  checkable: false,
  showIcon: true,
  blockNode: false,
  virtual: true,
  fullSelect: false,
  withoutSelectEffect: false,
};

const TreeMemo = React.memo(Tree);
TreeMemo.displayName = 'TreeMemo';
export { TreeMemo, RcTreeNode as TreeNode };

Tree.displayName = 'Tree';
export default Tree;
