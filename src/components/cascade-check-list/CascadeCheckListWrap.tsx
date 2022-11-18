import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ObjectInterface } from '@/components/_utils/interfaces';
import { CascadeCheckListMemo as CascadeCheckList } from '@/components/cascade-check-list/components/CascadeCheckList';

import {
  TreeNode,
  MedianSubNodeStatistic,
  FinalSubNodeStatistic,
  MedianNodeStatistic,
  FinalNodeStatistic,
  CheckedNodesIdsObj,
  CheckedStatus,
  NoChildLevelTreeNode,
} from './interfaces';

// 保证遍历单例运行
let onProcessing = false;

const debug = false;
// eslint-disable-next-line
const console = debug ? window.console : { ...window.console, log: (..._args: any) => {} };

const tempLeafNodeRouteIds: {
  [nodeId: string]: string[];
} = {};

interface TempSubNodeStatistic {
  [nodeVal: string]: {
    id: string;
    _id?: string[];
  };
}

export interface CascadeCheckListWrapProps {
  /** 层级菜单标题 */
  levelTitles?: string[];
  /** 受控：选中节点值 */
  checkedIds?: string[];
  /** 非受控：初始选中节点值 */
  initCheckedIds?: string[];
  /** 第一层级数据可能不是单一节点，因此会出现多棵数 */
  data: TreeNode[];
  /** 层级是否显示搜索框 */
  showSearchLevel?: number[];
  /** 层级搜索框 placeholder */
  levelSearchInputPlaceholder?: string[];
  /** 层级显示 Checkbox */
  levelShowCheckbox?: number[];
  /** 层级全选控制 */
  levelSelectAll?: number[];
  /** 层级全选控制文案 */
  levelSelectAllText?: string[];
  /** 自定义行渲染 */
  renderer?: (
    index: number,
    val: string,
    checkedStatus: CheckedStatus,
    isLeafNode: boolean,
  ) => React.ReactNode;
  /** 自定义行渲染层级 */
  customRendererLevel?: number[];
  /** 节点变更 */
  onChange?: (
    checkedNodesIds: string[],
    newCheckedIdsObj: { [id: string]: string | string[] },
  ) => void;

  /** 列表宽度 */
  rowWidth?: number | string;
  /** 列表最小宽度 */
  rowMinWidth?: number | string;
  /** 列表最大宽度 */
  rowMaxWidth?: number | string;
  /** 触发类型 (PC | mobile device) */
  triggerType?: 'click' | 'hover';
}

const generateObjFromArr = (arr: TreeNode[], level: number): MedianSubNodeStatistic => {
  const tempObj: MedianSubNodeStatistic = {};
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const item = arr[i];
    const { val, id, _id } = item;
    tempObj[id] = { id, _id, val, level };
  }
  return tempObj;
};

const generateFinalSubNodeStatistic = (nodes: TreeNode[]) => {
  return nodes.reduce((acc, node) => {
    const { _id, id } = node;
    acc[id] = _id || id;
    return acc;
  }, {} as FinalSubNodeStatistic);
};

const CascadeCheckListWrap: React.FC<CascadeCheckListWrapProps> = (props) => {
  const {
    levelTitles = [],
    data,
    showSearchLevel,
    levelSearchInputPlaceholder,
    levelShowCheckbox,
    levelSelectAll,
    levelSelectAllText,
    renderer,
    customRendererLevel,
    checkedIds,
    initCheckedIds,
    onChange,
    rowWidth,
    rowMinWidth,
    rowMaxWidth,
    triggerType = 'hover',
  } = props;

  const initIds = useMemo(() => {
    const ids = checkedIds || initCheckedIds;
    if (ids) {
      return ids.reduce((acc, id) => {
        acc[id] = id;
        return acc;
      }, {} as ObjectInterface);
    }
    return {};
  }, [checkedIds, initCheckedIds]);

  // 层级节点数据（非叶子节点的直接子孩子数据汇总）
  const [leveNodesStatistic, setLeveNodesStatistic] = useState<MedianNodeStatistic>({});
  // 子节点统计（所有节点的子节点汇总）用于计算勾选
  const [subNodesStatistic, setSubNodesStatistic] = useState<FinalNodeStatistic>({});
  // 选中节点 id 汇总
  const [checkedNodesIdsObj, setCheckedNodesIdsObj] = useState<CheckedNodesIdsObj>(initIds);
  const [maxLevel, setMaxLevel] = useState(0);

  // 遍历数据计算每个节点的子节点汇总，用于计算每一层子节点和节点勾选状态
  const traversalNode = useCallback((trees: TreeNode[]): [
    MedianNodeStatistic,
    FinalNodeStatistic,
  ] => {
    onProcessing = true;
    // 非叶子节点
    const noLeafNodeIds: string[] = [];
    const levelNodesStatistic: MedianNodeStatistic = {};
    const subNodesStatistic: MedianNodeStatistic = {};
    const partialFinalNodeStatistic: FinalNodeStatistic = {};
    // 树高为1的节点统计
    const filterNodesObj: { [nodeId: string]: string } = {};
    const treeLen = trees.length;

    console.time('dfs');
    // DFS 统计树高为1的子树的根节点（以减少最后统计非叶子节点拥有的叶子节点时间)
    for (let i = 0; i < treeLen; i++) {
      const tree = trees[i];
      // 子树高度统计
      const subTreeHeight: {
        [id: string]: {
          height: number;
          index: number;
        };
      } = {};
      const subTreeHeightIndexMapId: {
        [index: string]: string; // index -> id
      } = {};
      const tempStack: TreeNode[] = [tree];
      let index = 0;
      while (tempStack.length) {
        const { id, children } = tempStack[tempStack.length - 1];
        const nodeTreeHeightInfo = subTreeHeight[id];
        if (children.length) {
          if (nodeTreeHeightInfo) {
            // NOT LAST
            const { index: curNodeIndex } = nodeTreeHeightInfo;
            const nextId = subTreeHeightIndexMapId[curNodeIndex + 1];
            if (nextId) {
              nodeTreeHeightInfo.height = subTreeHeight[nextId].height + 1;
            } else {
              // LAST
              nodeTreeHeightInfo.height = nodeTreeHeightInfo.height + 1;
            }
            tempStack.pop();
          } else {
            // First traversal
            tempStack.push(...children.reverse());
            subTreeHeight[id] = {
              index,
              height: 0,
            };
            subTreeHeightIndexMapId[index] = id;
            index++;
          }
        } else {
          tempStack.pop();
        }
      }
      console.log('subTreeHeight: ', subTreeHeight);
      const ids = Object.keys(subTreeHeight);
      const idsCnt = ids.length;
      for (let i = 0; i < idsCnt; i++) {
        const id = ids[i];
        const { height } = subTreeHeight[id];
        if (height === 1) {
          filterNodesObj[id] = id;
        }
      }
    }
    console.log('filterNodesObj: ', filterNodesObj);
    console.timeEnd('dfs');

    console.time('bfs');
    // BFS 获取每个节点的直接子节点汇总
    for (let i = 0; i < treeLen; i++) {
      let level = 1;
      const tree = trees[i];
      const { id } = tree;
      let children: TreeNode[] = [];
      if ('children' in tree) {
        children = tree.children;
      }
      if (children.length) {
        const iterationFn = (acc: TreeNode[], node: TreeNode) => {
          const { id, children } = node;
          if (children.length) {
            const tempObj = generateObjFromArr(children, level);
            levelNodesStatistic[id] = tempObj;
            subNodesStatistic[id] = tempObj;
            if (id in filterNodesObj) {
              partialFinalNodeStatistic[id] = generateFinalSubNodeStatistic(children);
            }
            noLeafNodeIds.push(id);
          }
          acc.push(...children);
          return acc;
        };
        const tempObj = generateObjFromArr(children, level++);
        levelNodesStatistic[id] = tempObj;
        subNodesStatistic[id] = tempObj;
        // 对于树高为1的非叶子节点直接生成对应最终数据结构
        if (id in filterNodesObj) {
          partialFinalNodeStatistic[id] = generateFinalSubNodeStatistic(children);
        }
        noLeafNodeIds.push(id);
        let tempStack: TreeNode[] = children;
        while (tempStack.length) {
          tempStack = tempStack.reduce(iterationFn, [] as TreeNode[]);
          level++;
        }
      }
      setMaxLevel((prev) => Math.max(prev, level - 1));
      // console.log('maxLevel: ', maxLevel);
    }
    // console.log('partialFinalNodeStatistic: ', partialFinalNodeStatistic);
    console.timeEnd('bfs');

    console.time('generate struct');
    // 根据直接子节点汇总 得出最后节点汇总
    const finalNodeStatistic: FinalNodeStatistic = {};
    noLeafNodeIds.reverse().forEach((nodeId) => {
      if (nodeId in filterNodesObj) {
        finalNodeStatistic[nodeId] = partialFinalNodeStatistic[nodeId];
        return;
      }
      const subNodesValObj: FinalSubNodeStatistic | MedianSubNodeStatistic =
        (finalNodeStatistic[nodeId] as FinalSubNodeStatistic | undefined) ||
        (subNodesStatistic[nodeId] as MedianSubNodeStatistic | undefined) ||
        {};
      finalNodeStatistic[nodeId] = Object.keys(subNodesValObj).reduce((acc, val) => {
        if (!onProcessing) {
          return [{}, {}];
        }
        let res: ObjectInterface = {};
        const { id, _id } = subNodesValObj[val] as NoChildLevelTreeNode;
        const tempObj: TempSubNodeStatistic = { [val]: { id, _id } };
        while (Object.keys(tempObj).length) {
          const key = Object.keys(tempObj)[0];
          const { id, _id } = tempObj[key];
          delete tempObj[key];
          const subNodesObj = finalNodeStatistic[key] as FinalSubNodeStatistic;
          if (subNodesObj) {
            res = { ...res, ...subNodesObj };
          } else {
            res[id] = _id || id;
            if (_id) {
              tempLeafNodeRouteIds[id] = _id;
            }
          }
        }
        acc = { ...acc, ...res };
        return acc;
      }, {} as ObjectInterface) as FinalSubNodeStatistic;
    });

    console.timeEnd('generate struct');
    console.log('levelNodesStatistic: ', levelNodesStatistic);
    console.log('subNodesStatistic: ', finalNodeStatistic);
    return [levelNodesStatistic, finalNodeStatistic];
  }, []);

  useEffect(() => {
    if (data.length) {
      onProcessing = false;
      setTimeout(() => {
        const [lvSt, subNodeSt] = traversalNode(data);
        setLeveNodesStatistic(lvSt);
        setSubNodesStatistic(subNodeSt);
      });
    }
  }, [data, traversalNode]);

  useEffect(() => {
    if (checkedIds) {
      const nodesIdsObj = checkedIds.reduce((acc, v) => {
        acc[v] = tempLeafNodeRouteIds[v] || v;
        return acc;
      }, {} as CheckedNodesIdsObj);
      console.log('nodesIdsObj: ', nodesIdsObj);
      setCheckedNodesIdsObj(nodesIdsObj);
    }
  }, [checkedIds]);

  return (
    <CascadeCheckList
      rowWidth={rowWidth}
      rowMinWidth={rowMinWidth}
      rowMaxWidth={rowMaxWidth}
      control={!!checkedIds}
      renderer={renderer}
      customRendererLevel={customRendererLevel}
      level={0}
      levelTitles={levelTitles}
      data={data}
      leveNodesStatistic={leveNodesStatistic}
      subNodesStatistic={subNodesStatistic}
      checkedNodesIdsObj={checkedNodesIdsObj}
      updateCheckedNodesIdsObj={setCheckedNodesIdsObj}
      showSearchLevel={showSearchLevel}
      levelSearchInputPlaceholder={levelSearchInputPlaceholder}
      levelShowCheckbox={levelShowCheckbox}
      onChange={onChange}
      initCheckedIds={initCheckedIds}
      levelSelectAll={levelSelectAll}
      levelSelectAllText={levelSelectAllText}
      maxLevel={maxLevel}
      triggerType={triggerType}
    />
  );
};

CascadeCheckListWrap.displayName = 'CascadeCheckList';

const CascadeCheckListMemo = React.memo(CascadeCheckListWrap);
CascadeCheckListMemo.displayName = 'CascadeCheckListMemo';
export { CascadeCheckListMemo, CascadeCheckListWrap };
export { default as CascadeModifiedList } from './components/List';
export default CascadeCheckListWrap;
