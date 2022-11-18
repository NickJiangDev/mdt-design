export type LevelType = number;

export interface TreeNode {
  id: string;
  _id?: string[]; // 通路 id
  val: string;
  children: TreeNode[];
}

interface LevelTreeNode extends TreeNode {
  level: LevelType;
}

export type Option = Omit<TreeNode, 'children'>;

// 统计数据节点类型
export type NoChildLevelTreeNode = Omit<LevelTreeNode, 'children'>;

// 子节点统计中间值（记录对应子节点数据）
export interface MedianSubNodeStatistic {
  [subNodeId: string]: NoChildLevelTreeNode;
}

// 子节点统计最终值（记录对应叶子节点数据）
export interface FinalSubNodeStatistic {
  [leafNodeId: string]: string | string[];
}

// 统计数据类型
export interface MedianNodeStatistic {
  [nodeId: string]: MedianSubNodeStatistic;
}

export interface FinalNodeStatistic {
  [nodeId: string]: FinalSubNodeStatistic;
}

// 勾选叶子节点 val 汇总
export interface CheckedNodesIdsObj {
  [nodeId: string]: string | string[]; // nodeVal -> nodeVal
}

export interface ItemChecked {
  [id: string]: boolean;
}

export interface CheckedStatus {
  checkedObj: ItemChecked;
  indeterminateObj: ItemChecked;
  checkedCnt: number;
}
