export interface PackageInfoProps {
  packages: FilterPackageItemModel[];
  currentPackage?: FilterPackageItemModel;
  changeCurrentPackage?: (item: FilterPackageItemModel) => void;
}

export type StartAnalysisProps = {
  //是立即筛选还是点击开始分析筛选
  isConfirmFilter?: boolean;
  size?: string;
  btnLoading?: boolean;
  title: string;
};

export type TextLabelsProps = {
  //标准筛选左侧的更多按钮
  more?: string;
  //number的最大值label
  labelMax?: string;
  //number的最小值label
  labelMin?: string;
  //标准筛选器text list的空值
  //平铺筛选器list 的全选
  emptyValText?: string;
  //标准筛选器text list的全选
  //平铺筛选器list 的全选
  allSelectLabel?: string;
  //平铺筛选器的展开
  expand?: string;
  //平铺筛选器的手气
  collapse?: string;
};

export interface FilterCommProps {
  startAnalysisProps?: StartAnalysisProps;
  //以fieldUuid为key, value(text: ['yyy', 'xxx'], number: [1,2], datetime: [2012-09-28, 2019-03-23])
  fieldValueObj: { [key: string]: (React.ReactText | null)[] };
  //字段list
  list: FieldItemProps[];
  textLabels?: TextLabelsProps;
}

export interface FieldDetailProps {
  //根据字段name,数据包packageUuid,通过uuidV5生成的唯一标识
  uuid: string;
  hValue: string;
  db: string;
  hType: string;
  //字段真正的name，在数据包中存储的字段name
  name: string;
  // 来自数据包的uuid
  sourcePackageUuid: string;
}

export interface FieldItemProps {
  //显示name
  name: string;
  //单选多选
  mode: string;
  //字段类型
  type: string;
  detail: FieldDetailProps;
  //排序
  index: number;
  //是否隐藏自定义
  hiddenCustom?: boolean;
  //是否被聚合
  isCombined?: boolean;
}

//筛选器通用数据包格式
export interface FilterPackageItemModel {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
  geometryType: string;
  objectType: string;
  packageUuid: string;
  source: string;
}

export interface FieldNumValueProps {
  min?: number;
  max?: number;
}

export interface FieldDateValueProps {
  start?: number | string;
  end?: number | string;
}

//筛选条件格式
export interface FilterItemTemplateProp extends FieldNumValueProps, FieldDateValueProps {
  /** 后端存储的类型 类似于int,float,str, datetime */
  db: string;
  /** 前端存储的类型，类似于number,text, datetime */
  hType: string;
  /** name */
  hValue: string;
  list?: string[];
  //该字段是否可以在清除筛选中保存下来
  canSave?: boolean;
  //该字段是否被锁死
  isLock?: boolean;
}

//传给地图和图标的筛选器格式
export interface SuppFilterProps extends FilterPackageItemModel {
  filters: FilterItemTemplateProp[];
}
