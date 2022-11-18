import * as React from 'react';
import Icon from '@/components/icon';
import { isEmpty, map } from 'lodash';
import useMeasure from 'react-use/lib/useMeasure';
import StandardFieldItem from './StandardFieldItem';
import AnalysisBtn from '../AnalysisBtn';
import PackageDropDown from './PackageDropDown';
import {
  FieldItemProps,
  FilterCommProps,
  FilterItemTemplateProp,
  FilterPackageItemModel,
  SuppFilterProps,
} from '../interface';
import { getFieldFilter } from '../index';

export const prefixCls = `dmc-global-filter-sf`;

const STANDARD_FILTER_HEIGHT = 38;

const DEFAULT_CONTAINER_STYLE = {
  height: STANDARD_FILTER_HEIGHT,
  overflow: 'hidden',
};

const EXPAN_CONTAINER_STYLE = {
  height: 'auto',
  overflow: 'auto',
};

interface StandardProps extends FilterCommProps {
  packages: FilterPackageItemModel[];
  currentPackage?: FilterPackageItemModel;
  changeCurrentPackage?: (item: FilterPackageItemModel) => void;
  //标准筛选点击展开
  onVisibleChange?: (field: FieldItemProps) => void;
  clearFilter?: VoidFunction;
  showPackage?: boolean;
  startAnalysis: VoidFunction;
  suppFilter?: SuppFilterProps[];
  changeItem: (filterItem: FilterItemTemplateProp, field: FieldItemProps) => void;
}

const StandardFilter: React.FC<StandardProps> = ({
  packages,
  currentPackage,
  changeCurrentPackage,
  startAnalysis,
  startAnalysisProps,
  list,
  changeItem,
  suppFilter,
  onVisibleChange,
  fieldValueObj,
  showPackage = true,
  clearFilter,
  textLabels,
}) => {
  const [filterWrapperRef, { height: filterHeight }] = useMeasure<HTMLDivElement>();
  const [expand, setExpand] = React.useState(false);
  const hasMore = filterHeight > STANDARD_FILTER_HEIGHT;

  const changeExpand = React.useCallback(() => setExpand((expand: boolean) => !expand), []);

  const style = React.useMemo(() => {
    return expand ? EXPAN_CONTAINER_STYLE : DEFAULT_CONTAINER_STYLE;
  }, [expand]);

  const mornIcon = React.useMemo(() => {
    return (
      hasMore && (
        <div className={`${prefixCls}-item`} onClick={changeExpand}>
          <div className={`${prefixCls}-item`}>{textLabels?.more}</div>
          <Icon icon={`chevron-${expand ? 'up' : 'down'}`} size={12} />
        </div>
      )
    );
  }, [changeExpand, expand, hasMore, textLabels?.more]);

  const clearFilterNode = React.useMemo(() => {
    return (
      showPackage &&
      !isEmpty(currentPackage) && (
        <>
          <div className={`${prefixCls}-item-split-line`} />
          <div className={`${prefixCls}-more-icon`} onClick={clearFilter}>
            <Icon icon="delete-2" size={18} />
          </div>
        </>
      )
    );
  }, [clearFilter, currentPackage, showPackage]);

  return (
    <div className={`${prefixCls}-container`}>
      <div className={`${prefixCls}-all-wrapper`}>
        <div className={`${prefixCls}-sub-wrapper`}>
          <div className={prefixCls} style={style}>
            <div className={`${prefixCls}-content`} key={`${prefixCls}-content`}>
              <div className={`${prefixCls}-content-filter`} ref={filterWrapperRef}>
                <PackageDropDown
                  currentPackage={currentPackage}
                  packages={packages}
                  changeCurrentPackage={changeCurrentPackage}
                />
                {map(list, (field) => {
                  const filter = getFieldFilter(field.detail, suppFilter);
                  return (
                    <StandardFieldItem
                      key={field.detail.uuid}
                      field={field}
                      fieldFilter={filter}
                      changeItem={changeItem}
                      onVisibleChange={onVisibleChange}
                      options={fieldValueObj[field.detail.uuid]}
                      textLabels={textLabels}
                    />
                  );
                })}
              </div>
            </div>
            <div className={`${prefixCls}-action-icons`} key={`${prefixCls}-action-icons`}>
              {mornIcon}
              {clearFilterNode}
            </div>
          </div>
        </div>
      </div>
      <AnalysisBtn
        className={`${prefixCls}-analysis-button`}
        startAnalysis={startAnalysis}
        startAnalysisProps={startAnalysisProps}
      />
    </div>
  );
};

export default StandardFilter;
