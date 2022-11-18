export interface ToolProps {
  id: string;
  name: string;
  action?: () => unknown;
}

export interface InfoCfgProps {
  // 字段名
  key: string;

  // 字段类型 （例如 text number datetime）
  // 目前主要用于 信息卡片配置的数字类型字段的格式化
  type?: string | 'text' | 'number' | 'datetime';
}

export interface DsRecord {
  imgs?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
}

export interface DataSource {
  // 包名（在信息卡片左侧包选择列表中显示）
  objectType: string;
  // 兼容旧版
  source?: string;
  data: DsRecord[];
  geometryType?: GeometryType;
  infoCfg?: InfoCfgProps[];
  packageUuid?: string;
  // 详情部分头部工具栏
  headerTools?: ToolProps[];
  renderHeaderTools?: (ds: DataSource | undefined) => React.ReactNode;
  // 详情底部底部工具栏
  footerTools?: ToolProps[];
  renderFooterTools?: (ds: DataSource | undefined) => React.ReactNode;

  // 字段展示设置
  infoWindowSettings?: {
    // 数字类型字段保留小数设置
    decimalSetting?: number;
  };

  // 数据源唯一标识符
  dataSourceUniqueKey?: string;

  [otherkey: string]: unknown;
}

/** 数据的地理类型 */
export enum GeometryType {
  /** 点 */
  point = 'point',
  /** 线 */
  line = 'line',
  /** 面 */
  polygon = 'polygon',
  /** 文本 */
  plain = 'plain',
  /** 点到点 */
  pointToPoint = 'point_to_point',
  /** 点到线 */
  pointToLine = 'point_to_line',
  /** 点到面 */
  pointToPolygon = 'point_to_polygon',
  /** 线到点 */
  lineToPoint = 'line_to_point',
  /** 线到线 */
  lineToLine = 'line_to_line',
  /** 线到面 */
  lineToPolygon = 'line_to_polygon',
  /** 面到点 */
  polygonToPoint = 'polygon_to_point',
  /** 面到线 */
  polygonToLine = 'polygon_to_line',
  /** 面到面 */
  polygonToPolygon = 'polygon_to_polygon',
}
