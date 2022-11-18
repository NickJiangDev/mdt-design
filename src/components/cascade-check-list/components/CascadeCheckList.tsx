import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Icon } from '@/components/icon';
import { ObjectInterface } from '@/components/_utils/interfaces';

import {
  CheckedNodesIdsObj,
  CheckedStatus,
  FinalNodeStatistic,
  ItemChecked,
  LevelType,
  MedianNodeStatistic,
  MedianSubNodeStatistic,
  NoChildLevelTreeNode,
  Option,
  TreeNode,
} from '../interfaces';
import '../style/cascade-check-list.less';
import List, { virtualizedListWrapperClassName } from './List';
import debounce from 'lodash/debounce';
import map from 'lodash/map';

const prefixCls = 'dmc-cascade-check-list';

const debug = false;
// eslint-disable-next-line
const console = debug ? window.console : { ...window.console, log: (..._args: any) => {} };

// checklist 间距
const listGap = 5;

// 判断是否需要关闭子菜单的延迟时间
const enterListDelay = 300;
// 光标进入行 去抖
const debounceEnterLineDelay = 300;
// 判断光标离开行延迟时间
const leaveLineDelay = 400;

interface MouseEnterLineFlag {
  [level: number]: number | null;
}

interface MouseEnterListFlag {
  [level: number]: boolean;
}

// 全局状态 指示各层次光标进入
const mouseEnterListFlag: MouseEnterListFlag = {};
// 全局状态 指示各行光标进入
const mouseEnterLineFlag: MouseEnterLineFlag = {};

// // 针对叶子节点通路的临时 Id 存储
// // tempLeavIdPrefix + 下标 = 临时id
// // 值为对应的通路
// const tempLeafIdsMap: Array<string[]> = [];

interface CascadeCheckListProps {
  // 层级菜单标题
  levelTitles: string[];
  // 受控：选中节点值
  control?: boolean;
  // 非受控：初始选中节点值
  initCheckedIds?: string[];
  // 第一层级数据可能不是单一节点，因此会出现多棵数
  data: TreeNode[] | NoChildLevelTreeNode[];
  // 层级是否显示搜索框
  showSearchLevel?: number[];
  // 层级搜索框 placeholder
  levelSearchInputPlaceholder?: string[];
  // 层级显示 Checkbox
  levelShowCheckbox?: number[];
  // 层级全选控制
  levelSelectAll?: number[];
  levelSelectAllText?: string[];
  // 自定义行渲染
  renderer?: (
    index: number,
    val: string,
    checkedStatus: CheckedStatus,
    isLeafNode: boolean,
  ) => React.ReactNode;
  // 自定义行渲染层级
  customRendererLevel?: number[];
  // 勾选变更
  onChange?: (
    checkedNodesIds: string[],
    newCheckedIdsObj: { [id: string]: string | string[] },
  ) => void;
  // onChange?: (checkedNodesIds: string[], checkedNodesIdsObj: FinalSubNodeStatistic) => void;
  // 层级节点数据（非叶子节点的直接子孩子数据汇总）
  leveNodesStatistic: MedianNodeStatistic;
  // 子节点统计（所有非叶子节点的子节点汇总）用于计算勾选
  subNodesStatistic: FinalNodeStatistic;
  // 选中节点值
  checkedNodesIdsObj: CheckedNodesIdsObj;
  updateCheckedNodesIdsObj?: (ids: CheckedNodesIdsObj) => void;
  // 当前层级
  level: LevelType;
  style?: React.CSSProperties;
  maxLevel: number;
  // 处理子列表挂载
  handleMount?: (mount: boolean) => void;
  // 列表宽度
  rowWidth?: number | string;
  rowMinWidth?: number | string;
  rowMaxWidth?: number | string;

  // 触发类型
  triggerType?: 'click' | 'hover';
}

// 计算节点勾选状态
const computeCheckedStatus = (
  id: string,
  subNodesStatistic: FinalNodeStatistic,
  checkedNodesIds: CheckedNodesIdsObj,
) => {
  let cnt = 0;
  let checkedCnt = 0;
  let checked = false;
  let indeterminate = false;
  const subNodesObj = subNodesStatistic[id];
  // 非叶子节点
  if (subNodesObj) {
    const curNodeSubNodesIds = Object.keys(subNodesObj);
    const curNodeSubNodesIdsCnt = curNodeSubNodesIds.length;
    for (let i = 0; i < curNodeSubNodesIdsCnt; i++) {
      if (curNodeSubNodesIds[i] in checkedNodesIds) {
        cnt++;
      }
    }
    if (cnt > 0) {
      indeterminate = true;
      checkedCnt++;
    }
    if (cnt === curNodeSubNodesIdsCnt) {
      checked = true;
    }
  } else if (id in checkedNodesIds) {
    checked = true;
    checkedCnt++;
  }
  return {
    checked,
    indeterminate,
    checkedCnt,
  };
};

const CascadeCheckList = React.memo(
  React.forwardRef<HTMLDivElement | null, CascadeCheckListProps>((props, ref) => {
    const {
      levelTitles,
      data,
      leveNodesStatistic,
      subNodesStatistic,
      level = 0,
      checkedNodesIdsObj,
      updateCheckedNodesIdsObj,
      showSearchLevel,
      levelSearchInputPlaceholder,
      levelShowCheckbox,
      levelSelectAll,
      levelSelectAllText,
      renderer,
      customRendererLevel,
      control = false,
      initCheckedIds,
      onChange,
      style,
      maxLevel,
      handleMount,
      rowWidth,
      rowMinWidth,
      rowMaxWidth,
      triggerType = 'hover',
    } = props;

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const childListRef = useRef<HTMLDivElement | null>(null);
    // 当前激活项目（通过 hover / click菜单项) data-id
    const currentActiveElementId = useRef<string | undefined>(undefined);
    const ComponentMountRef = useRef(true);
    // activeIndex 为内部状态 控制显示子菜单，状态非实时更新（debounce)
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [curHoverTargetPos, setCurHoverTargetPos] = useState<DOMRect | null>(null);
    const [hoverItemId, setHoverItemId] = useState<string>('');
    const [isChildMounted, setChildMounted] = useState(false);
    const showSearch = showSearchLevel?.includes(level) ?? false;
    const showCheckbox = levelShowCheckbox?.includes(level) ?? true;
    const searchInputPlaceholder = levelSearchInputPlaceholder?.[level] ?? '';
    const applyCustomRenderer = customRendererLevel?.includes(level) ?? true;
    const selectAll = levelSelectAll?.includes(level) ?? true;
    const selectAllText = levelSelectAllText?.[level] || undefined;
    // 子级列表样式
    const [dropDownPositionStyle, setDropDownPositionStyle] = useState<React.CSSProperties>({
      position: 'absolute',
      top: '-9999px',
      left: '-9999px',
      zIndex: 9999,
    });
    const subData = useMemo(() => {
      const subNodesData: MedianSubNodeStatistic = leveNodesStatistic[hoverItemId] || {};
      return Object.values(subNodesData);
    }, [leveNodesStatistic, hoverItemId]);

    const options = useMemo((): Option[] => {
      return (
        map<TreeNode | NoChildLevelTreeNode, Option>(data, ({ id, val, _id }) => ({
          id,
          _id,
          val: val,
        })) || []
      );
    }, [data]);

    const getEnterChildListFlag = useCallback(
      (level: number) => {
        let flag = false;
        for (let l = level + 1; l < maxLevel; l++) {
          const levelEnterFlag = mouseEnterListFlag[l] ?? false;
          if (levelEnterFlag) {
            flag = true;
            break;
          }
        }
        return flag;
      },
      [maxLevel],
    );

    const refCallback = useCallback(
      (node: HTMLDivElement | null) => {
        if (ref instanceof Function) {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        wrapperRef.current = node;
      },
      [ref],
    );

    // 勾选状态计算
    const checkedStatus: CheckedStatus = useMemo(() => {
      const checkedObj: ItemChecked = {};
      const indeterminateObj: ItemChecked = {};
      const optionsCnt = options.length;
      let checkedCnt = 0;
      for (let i = 0; i < optionsCnt; i++) {
        const { id } = options[i];
        const { checked, indeterminate, checkedCnt: _checkedCnt } = computeCheckedStatus(
          id,
          subNodesStatistic,
          checkedNodesIdsObj,
        );
        checkedCnt += _checkedCnt;
        checkedObj[id] = checked;
        indeterminateObj[id] = indeterminate;
      }
      return {
        checkedCnt,
        checkedObj,
        indeterminateObj,
      };
    }, [checkedNodesIdsObj, options, subNodesStatistic]);

    const handleClearActiveIndex = useCallback(
      (callback: () => void) => {
        const enterChildListFlag = getEnterChildListFlag(level);
        if (
          mouseEnterLineFlag[level] === null &&
          !enterChildListFlag &&
          ComponentMountRef.current
        ) {
          callback();
        }
      },
      [getEnterChildListFlag, level],
    );

    const handleMouseEnter = useCallback(() => {
      if (triggerType === 'hover') {
        mouseEnterListFlag[level] = true;
        setTimeout(() => {
          // 从子级返回父级非数据行时
          handleClearActiveIndex(() => {
            setActiveIndex(null);
          });
        }, enterListDelay);
        console.log('enter: ', level, mouseEnterListFlag);
      }
    }, [handleClearActiveIndex, level, triggerType]);

    const handleMouseLeave = useCallback(() => {
      if (triggerType === 'hover') {
        console.log('trigger leave');
        const enterChildListFlag = getEnterChildListFlag(level);
        if (!enterChildListFlag) {
          // 光标未进入子菜单下的 mouseleave 表明也离开了当前层级
          mouseEnterListFlag[level] = false;
          console.log('leave: ', level);
        }
        setTimeout(() => {
          handleClearActiveIndex(() => {
            setActiveIndex(null);
          });
        }, enterListDelay);
      }
    }, [getEnterChildListFlag, handleClearActiveIndex, level, triggerType]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const _handleEnterLine = useCallback(
      debounce(
        (pos: DOMRect | null, id: string, index: number) => {
          if (ComponentMountRef.current) {
            const nextLevel = level + 1;
            if (!mouseEnterListFlag[nextLevel]) {
              setActiveIndex(index);
              setCurHoverTargetPos(pos);
              setHoverItemId(id);
            }
          }
        },
        triggerType === 'hover' ? debounceEnterLineDelay : 0,
      ),
      [level],
    );

    // 光标触发打开子菜单
    const handleActiveLine = useCallback(
      (pos: DOMRect, id: string, _val: string, index: number, dom: HTMLDivElement) => {
        mouseEnterLineFlag[level] = index;
        currentActiveElementId.current = dom.dataset.id;
        console.log('enter line', index);
        _handleEnterLine(pos, id, index);
      },
      [_handleEnterLine, level],
    );

    // 关闭子菜单
    const handleInactiveLine = useCallback(() => {
      mouseEnterLineFlag[level] = null;
      setTimeout(() => {
        handleClearActiveIndex(() => {
          console.log('leave line');
          setActiveIndex(null);
          setHoverItemId('');
        });
      }, leaveLineDelay);
    }, [handleClearActiveIndex, level]);

    // 更新勾选状态
    const _handleChange = useCallback(
      (
        id: string,
        _id: string[] | undefined,
        _val: string,
        checked: boolean,
        checkedNodesVals: CheckedNodesIdsObj,
      ) => {
        let toChangeNodesIds = [id];
        let toChangeNodesVals: (string | string[])[] = [_id || id];
        const curNodeLeafNodesObj = subNodesStatistic[id];
        if (curNodeLeafNodesObj) {
          toChangeNodesIds = Object.keys(curNodeLeafNodesObj);
          toChangeNodesVals = Object.values(curNodeLeafNodesObj);
        }
        const nodeCnt = toChangeNodesIds.length;
        for (let i = 0; i < nodeCnt; i++) {
          const nodeId = toChangeNodesIds[i];
          const nodeVal = toChangeNodesVals[i];
          if (checked) {
            checkedNodesVals[nodeId] = nodeVal;
          } else {
            delete checkedNodesVals[nodeId];
          }
        }
        console.log('checkedNodesVals: ', checkedNodesVals);
      },
      [subNodesStatistic],
    );

    const handleCheckboxChange = useCallback(
      (id: string, _id: string[] | undefined, val: string, checked: boolean) => {
        const tmpCheckNodesIdsOjb = { ...checkedNodesIdsObj };
        _handleChange(id, _id, val, checked, tmpCheckNodesIdsOjb);
        if (!control) {
          updateCheckedNodesIdsObj?.(tmpCheckNodesIdsOjb || {});
        }
        onChange?.(Object.keys(tmpCheckNodesIdsOjb), tmpCheckNodesIdsOjb);
      },
      [checkedNodesIdsObj, updateCheckedNodesIdsObj, _handleChange, control, onChange],
    );

    const handleCheckedAllChange = useCallback(
      (checked: boolean) => {
        const tmpCheckNodesIdsOjb = { ...checkedNodesIdsObj };
        const optionsLen = options.length;
        for (let i = 0; i < optionsLen; i++) {
          const { id, _id, val } = options[i];
          _handleChange(id, _id, val, checked, tmpCheckNodesIdsOjb);
        }
        if (!control) {
          updateCheckedNodesIdsObj?.(tmpCheckNodesIdsOjb || {});
        }
        onChange?.(Object.keys(tmpCheckNodesIdsOjb), tmpCheckNodesIdsOjb);
      },
      [checkedNodesIdsObj, updateCheckedNodesIdsObj, _handleChange, control, onChange, options],
    );

    const handleChildListMount = useCallback((childListMount: boolean) => {
      setChildMounted(childListMount);
    }, []);

    const getOffsetParentTop = useCallback((el: HTMLDivElement) => {
      let curEl: Element | null = el;
      let offsetTop = 0;
      while (curEl && !curEl.classList.contains(prefixCls)) {
        offsetTop += ((curEl as unknown) as HTMLElement).offsetTop || 0;
        curEl = ((curEl as unknown) as HTMLElement).offsetParent || null;
      }
      return offsetTop;
    }, []);

    useEffect(() => {
      ComponentMountRef.current = true;
      handleMount?.(true);
      return () => {
        ComponentMountRef.current = false;
        handleMount?.(false);
      };
    }, [handleMount]);

    useEffect(() => {
      const listRef = wrapperRef.current;
      const activeElementId = currentActiveElementId.current;
      if (isChildMounted && curHoverTargetPos && listRef && activeElementId) {
        const activeElement = listRef.querySelector(
          `.${virtualizedListWrapperClassName} [data-id="${activeElementId}"]`,
        );
        if (!activeElement) {
          console.error('cascade checklist error: failed to found active element');
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          console._error('cascade checklist error: failed to found active element');
          return;
        }
        const offsetTopOfList = getOffsetParentTop(activeElement as HTMLDivElement);
        const { top, left, width: targetWidth } = curHoverTargetPos;
        const { current: childList } = childListRef;
        if (childList) {
          let newTop = offsetTopOfList;
          let newLeft = targetWidth + listGap;
          const {
            width: childListWidth,
            height: childListHeight,
          } = childList.getBoundingClientRect();
          const { innerWidth, innerHeight } = window;
          const childBottomToClientTop = top + childListHeight;
          const childRightToClientRight = newLeft + left + childListWidth;
          // 检测屏幕边缘
          if (childBottomToClientTop > innerHeight) {
            newTop -= childBottomToClientTop - innerHeight;
          }
          if (childRightToClientRight > innerWidth) {
            newLeft -= childRightToClientRight - innerWidth;
          }

          const virtualListDom = listRef.querySelector('.ReactVirtualized__List');
          setDropDownPositionStyle((prev) => ({
            ...prev,
            // 减去纵向滚动值
            top: `${newTop - (virtualListDom?.scrollTop || 0)}px`,
            left: `${newLeft}px`,
          }));
        }
      }
    }, [childListRef, curHoverTargetPos, getOffsetParentTop, isChildMounted]);

    const _renderer = useCallback(
      (
        id: string,
        _id: string[] | undefined,
        val: string,
        _checked: boolean,
        item: ObjectInterface,
        index: number,
      ) => {
        const subNodesData: MedianSubNodeStatistic = leveNodesStatistic[item.id] || {};
        return (
          <>
            {renderer && applyCustomRenderer ? (
              <div
                className={`${prefixCls}-custom-item-wrap`}
                onClick={() => handleCheckboxChange(id, _id, val, !checkedStatus.checkedObj[id])}
              >
                {renderer(index, val, checkedStatus, !subNodesStatistic[id])}
              </div>
            ) : (
              <span className={`${prefixCls}-row-content`}>
                <span className="content">{val}</span>
                {Object.keys(subNodesData).length > 0 && <Icon icon="play" size={16} />}
              </span>
            )}
          </>
        );
      },
      [
        leveNodesStatistic,
        subNodesStatistic,
        applyCustomRenderer,
        checkedStatus,
        handleCheckboxChange,
        renderer,
      ],
    );

    return (
      <div
        className={prefixCls}
        ref={refCallback}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={style}
      >
        <List
          rowWidth={rowWidth}
          rowMinWidth={rowMinWidth}
          rowMaxWidth={rowMaxWidth}
          selectAll={selectAll}
          selectAllText={selectAllText}
          showCheckbox={showCheckbox}
          showSearch={showSearch}
          searchInputPlaceholder={searchInputPlaceholder}
          options={options}
          renderer={_renderer}
          level={level}
          levelTitles={levelTitles}
          checkedStatus={checkedStatus}
          handleMouseEnterLine={handleActiveLine}
          handleMouseLeaveLine={handleInactiveLine}
          handleCheckboxChange={handleCheckboxChange}
          handleCheckedAllChange={handleCheckedAllChange}
          triggerType={triggerType}
        />
        {activeIndex !== null && subData.length > 0 && (
          <CascadeCheckList
            ref={childListRef}
            rowWidth={rowWidth}
            rowMinWidth={rowMinWidth}
            rowMaxWidth={rowMaxWidth}
            style={dropDownPositionStyle}
            renderer={renderer}
            customRendererLevel={customRendererLevel}
            level={level + 1}
            levelTitles={levelTitles}
            data={subData}
            leveNodesStatistic={leveNodesStatistic}
            subNodesStatistic={subNodesStatistic}
            checkedNodesIdsObj={checkedNodesIdsObj}
            updateCheckedNodesIdsObj={updateCheckedNodesIdsObj}
            showSearchLevel={showSearchLevel}
            levelSearchInputPlaceholder={levelSearchInputPlaceholder}
            levelShowCheckbox={levelShowCheckbox}
            onChange={onChange}
            control={control}
            initCheckedIds={initCheckedIds}
            levelSelectAll={levelSelectAll}
            levelSelectAllText={levelSelectAllText}
            maxLevel={maxLevel}
            handleMount={handleChildListMount}
            triggerType={triggerType}
          />
        )}
      </div>
    );
  }),
);

CascadeCheckList.displayName = 'CascadeCheckList';
export default CascadeCheckList;

const CascadeCheckListMemo = React.memo(CascadeCheckList);
CascadeCheckListMemo.displayName = 'CascadeCheckListMemo';
export { CascadeCheckListMemo };
