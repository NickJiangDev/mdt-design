import * as React from 'react';
import classnames from 'classnames';
import Input from '@/components/input';
import Tree from '../tree';
import { ObjectInterface } from '../_utils/interfaces';
import Spin from '@/components/spin';
import useStaticCallback from '@/hooks/useStaticCallback';
import useMeasure from 'react-use/lib/useMeasure';
import Icon from '@/components/icon';
import cloneDeep from 'lodash/cloneDeep';
import { TreeProps as RcTreeProps } from 'rc-tree';
import './style/check-list.less';
import { difference, intersection, union } from 'lodash';

export interface TreeLabelValueItemInterface extends ObjectInterface {
  title: string;
  key: React.ReactText;
  icon?: React.ReactNode;
  children?: TreeLabelValueItemInterface[];
}

export interface TreeCheckListProps
  extends Omit<
    RcTreeProps,
    'prefixCls' | 'checkedKeys' | 'onCheck' | 'treeData' | 'height' | 'checkable'
  > {
  /** 搜索栏的显隐 */
  hideSearch?: boolean;
  /** 设置搜索框的大小 */
  size?: 'compact';
  /** 类型 */
  type?: 'assist-bg' | 'menu-bg';
  /** 设置列表的标题 */
  text?: React.ReactNode;
  /** 列表加载 */
  loading?: boolean;
  /** 绑定值 */
  value?: React.ReactText[];
  /** 默认绑定值 */
  defaultValue?: React.ReactText[];
  /** 选择项，tree结构 */
  options?: TreeLabelValueItemInterface[];
  /** 选项变化时的回调函数 */
  onChange?: (selected: string[]) => void;
  /** 类名 */
  className?: string;
  /** 列表单元的类名 */
  itemClassName?: string;
  /** 是否自适应高度（会使最大高度失效） */
  flexHeight?: boolean;
  /** 列表空状态显示 */
  noContentText?: string;
  /** 搜索条件未命中显示 */
  noResultText?: string;
  /** 搜索占位 */
  placeholder?: string;
  /** 列表筛选 */
  filterList?: (
    options: TreeLabelValueItemInterface[],
    search: string,
  ) => TreeLabelValueItemInterface[];
  /** 列筛选 */
  filterItem?: (val: TreeLabelValueItemInterface, search: string) => boolean;
  /** 列表的最大高度 */
  maxHeight?: number;
  /** 整体宽度 */
  width?: number;
  /** 设置列表高度 */
  listHeight?: number;
  /** 列表勾选框显隐 */
  checkable?: boolean;
}

const prefixCls = 'dmc-check-list';

const defaultProps = {
  checkable: true,
  maxHeight: 330,
  options: [],
  // value: [],
  defaultValue: [],
};

const searchTree = (
  options: TreeLabelValueItemInterface[],
  search: string,
  filterItem: (val: TreeLabelValueItemInterface, search: string) => boolean = (val, search) =>
    val.title.indexOf(search) > -1,
) => {
  const opts = cloneDeep(options);
  const len = opts.length;
  for (let i = 0; i < len; i++) {
    const item = opts[i];
    if (item) {
      if (item.children) {
        const child = searchTree(item.children, search);
        if (child.length) {
          opts[i].children = child;
        } else {
          if (!filterItem(item, search)) {
            opts.splice(i, 1);
            i--;
          }
        }
      } else {
        if (!filterItem(item, search)) {
          opts.splice(i, 1);
          i--;
        }
      }
    }
  }
  return opts;
};

function flatTree(array: ObjectInterface[]) {
  const arr: string[] = [];
  (function recurrence(array) {
    Array.from(array, (item) => {
      if (item.children) {
        recurrence(item.children);
      } else {
        arr.push(item.key);
      }
    });
  })(array);
  return arr;
}
const TreeCheckList: React.FC<TreeCheckListProps> = (props) => {
  const {
    hideSearch,
    type,
    text,
    size,
    flexHeight,
    loading,
    options,
    value,
    defaultValue,
    className,
    onChange,
    noContentText,
    noResultText,
    placeholder,
    filterList,
    filterItem,
    width,
    listHeight,
    maxHeight,
    checkable,
    ...restProps
  } = props as TreeCheckListProps & typeof defaultProps;
  const [search, setSearch] = React.useState('');
  const [unControlVal, setUnControlVal] = React.useState(defaultValue as string[]);
  const [subKeys, setSubKeys] = React.useState([] as string[]);

  React.useEffect(() => {
    setSubKeys(flatTree(options) as string[]);
  }, [options]);

  const searchList = React.useMemo(() => {
    return search
      ? filterList
        ? filterList(options, search)
        : filterItem
        ? searchTree(options, search, filterItem)
        : searchTree(options, search)
      : options;
  }, [search, filterList, options, filterItem]);
  const isControl = 'value' in props;
  const val = isControl ? value : unControlVal;

  const cls = classnames(className, `${prefixCls}`, {
    [`${prefixCls}-flex-height`]: flexHeight,
    [`${prefixCls}-${type}`]: type,
  });

  const [ref, { height: eleHeight }] = useMeasure<HTMLDivElement>();

  const onInputChange = useStaticCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearch(value);
  });
  const onCheckChange = useStaticCallback((selected: string[], info) => {
    // 当前是unchecked的状态，需要找到哪些key被unchecked掉了，然后去除
    let uncheckedKeys: string[] = [];
    if (!info.checked) {
      uncheckedKeys = info.node.children ? flatTree(info.node.children) : [info.node.key];
    }
    // 获取被搜索条件筛选掉的key，他们不随当前check的条件改变而改变
    const filteredKeys = intersection(subKeys, val as string[]);
    // 不是子节点的key
    const childNodeKey: string[] = [];
    const childNode = info.checkedNodes.filter((node: ObjectInterface) => node.children);
    childNode.forEach((node: ObjectInterface) => {
      childNodeKey.push(node.key);
    });
    // 所有子节点的checked
    const childKeys = difference(selected, childNodeKey);
    // 拼接被筛选条件过滤掉的key
    const allChildKeys = union(childKeys, filteredKeys);
    // 去掉unchecked状态的key
    const checkedAllChildKeys = difference(allChildKeys, uncheckedKeys);
    const newVal = search ? checkedAllChildKeys : selected;
    !isControl && setUnControlVal(newVal);
    onChange && onChange(newVal);
  });
  const NoRowsRenderer = () => {
    const text = !options.length ? noContentText : noResultText;
    return <div className={`${prefixCls}-no-content`}>{text}</div>;
  };
  const calcHeight = flexHeight ? eleHeight : listHeight ? eleHeight : maxHeight;
  return (
    <div className={cls} style={{ width }}>
      <div className={`${prefixCls}-wrap`}>
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
          </div>
        )}
        {loading ? (
          <div className={`${prefixCls}-icon-wrap`}>
            <Spin className={`${prefixCls}-icon-loading`} />
          </div>
        ) : (
          <div className={`${prefixCls}-list`}>
            {!!text && <div className={`${prefixCls}-list-description`}>{text}</div>}
            {!!searchList.length ? (
              <div className={`${prefixCls}-list-tree`} ref={ref} style={{ height: listHeight }}>
                {!(flexHeight && !eleHeight) && (
                  <Tree
                    {...restProps}
                    checkable={checkable}
                    height={calcHeight}
                    selectable={false}
                    onCheck={onCheckChange}
                    checkedKeys={val}
                    icon={(props) => {
                      return props.data?.children ? <Icon icon="folder" size={18} /> : null;
                    }}
                    treeData={searchList}
                  />
                )}
              </div>
            ) : (
              <NoRowsRenderer />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

TreeCheckList.defaultProps = defaultProps;

TreeCheckList.displayName = 'TreeCheckList';
export default TreeCheckList;

const TreeCheckListMemo = React.memo(TreeCheckList);
TreeCheckListMemo.displayName = 'TreeCheckListMemo';
export { TreeCheckListMemo };
