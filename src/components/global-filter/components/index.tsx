import * as React from 'react';
import classNames from 'classnames';
import { useMeasure } from 'react-use';
import omit from 'lodash/omit';
import find from 'lodash/find';
import {
  FieldDetailProps,
  FieldItemProps,
  FilterCommProps,
  FilterItemTemplateProp,
  PackageInfoProps,
  SuppFilterProps,
  TextLabelsProps,
} from './interface';
import { FilterTypeEnum } from '../enum';
import { prefix, TILED_FIELD_ROW_HEIGHT } from '../constants';
import TiledFilter from './tiled/Tiled';
import StandardFilter from './standard/Standard';
import '../style/filter.less';

//获取当前数据包当前字段的filter
export const getFieldFilter = (field: FieldDetailProps, suppFilter?: SuppFilterProps[]) => {
  const currentFilters = find(suppFilter, { packageUuid: field.sourcePackageUuid })?.filters ?? [];
  const filter = find(currentFilters, { hValue: field.hValue });
  return filter;
};

// 从外部接收到的props
export interface FilterProps extends FilterCommProps {
  //数据包信息
  packageInfo: PackageInfoProps;
  showPackage?: boolean;
  filterType?: FilterTypeEnum;
  className?: string;
  style?: React.CSSProperties;
  //单个筛选条件onOK
  onChange?: (item: FilterItemTemplateProp, field: FieldItemProps) => void;
  /*标准筛选点击展开 */
  onVisibleChange?: (field: FieldItemProps) => void;
  startAnalysis?: (vals: SuppFilterProps[]) => void;

  //平铺筛选下，默认显示字段个数
  fieldCount?: number;
  //平铺筛选最下方的展开收起
  onOpen?: (open: boolean) => void;
  suppFilter?: SuppFilterProps[];
  clearFilter?: VoidFunction;
  textLabels?: TextLabelsProps;
  renderRestLabel?: (count: number) => string;
}

const FilterView: React.FC<FilterProps> = ({
  filterType,
  className,
  style,
  list,
  onChange,
  startAnalysis: onClick,
  startAnalysisProps,
  showPackage,
  packageInfo: { packages, currentPackage, changeCurrentPackage },
  onVisibleChange,
  fieldValueObj,
  fieldCount,
  onOpen,
  suppFilter,
  clearFilter,
  textLabels,
  ...restProps
}) => {
  const [domref, { height: childrenHeight }] = useMeasure<HTMLDivElement>();

  //平铺筛选器的最大高度
  const HALF_CLIENT_HEIGHT = window.document.body.clientHeight / 2;

  const isTiled = filterType === FilterTypeEnum.tiled;

  const cls = classNames(`${prefix}`, `${className}`, {
    [`${prefix}-s`]: !isTiled,
    [`${prefix}-t`]: isTiled,
  });

  const changeItem = React.useCallback(
    (filterItem: FilterItemTemplateProp, field: FieldItemProps) => {
      onChange && onChange(filterItem, field);
    },
    [onChange],
  );

  const mixedStyle = React.useMemo(
    () => ({
      height:
        isTiled && childrenHeight > HALF_CLIENT_HEIGHT - TILED_FIELD_ROW_HEIGHT
          ? HALF_CLIENT_HEIGHT
          : 'auto',
      ...omit(style, 'height'),
    }),
    [HALF_CLIENT_HEIGHT, childrenHeight, isTiled, style],
  );

  const startAnalysis = React.useCallback(() => {
    onClick && onClick(suppFilter ?? []);
  }, [suppFilter, onClick]);

  const commProps = React.useMemo(() => {
    return {
      list,
      startAnalysis,
      startAnalysisProps,
      changeItem,
      fieldValueObj,
      textLabels,
      suppFilter,
      clearFilter,
    };
  }, [
    list,
    clearFilter,
    suppFilter,
    startAnalysis,
    startAnalysisProps,
    changeItem,
    fieldValueObj,
    textLabels,
  ]);

  const tiledProps = React.useMemo(() => {
    return {
      ...commProps,
      onOpen,
      ref: domref,
      fieldCount,
    };
  }, [commProps, onOpen, domref, fieldCount]);

  const standProps = React.useMemo(() => {
    return {
      ...commProps,
      packages,
      showPackage,
      currentPackage,
      changeCurrentPackage,
      onVisibleChange,
    };
  }, [commProps, packages, showPackage, currentPackage, changeCurrentPackage, onVisibleChange]);

  return (
    <div {...restProps} className={cls} style={mixedStyle}>
      {isTiled ? <TiledFilter {...tiledProps} /> : <StandardFilter {...standProps} />}
    </div>
  );
};

FilterView.defaultProps = {
  filterType: FilterTypeEnum.standard,
  showPackage: true,
};

export default FilterView;
