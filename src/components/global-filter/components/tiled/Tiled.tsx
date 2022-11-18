import * as React from 'react';
import map from 'lodash/map';
import Scrollbar from '@/components/scrollbar';
import {
  FieldItemProps,
  FilterCommProps,
  FilterItemTemplateProp,
  SuppFilterProps,
} from '../interface';
import TiledFieldItem from './TiledFieldItem';
import TiledFilterFooter from './TiledFooter';
import { getFieldFilter } from '../index';

export const prefixCls = `dmc-global-filter-tf`;

interface TiledProps extends FilterCommProps {
  //平铺筛选下，默认显示字段个数
  fieldCount?: number;
  //平铺筛选最下方的展开收起
  onOpen?: (open: boolean) => void;
  startAnalysis: VoidFunction;
  suppFilter?: SuppFilterProps[];
  changeItem: (filterItem: FilterItemTemplateProp, field: FieldItemProps) => void;
  renderRestLabel?: (count: number) => string;
  clearFilter?: VoidFunction;
}

const TiledFilter = React.forwardRef<HTMLDivElement, TiledProps>(
  (
    {
      fieldCount: originFieldCount,
      changeItem,
      //开始分析
      startAnalysis,
      list: fieldList,
      fieldValueObj,
      onOpen,
      suppFilter,
      startAnalysisProps,
      textLabels,
      renderRestLabel,
      clearFilter,
    },
    ref,
  ) => {
    console.log('🚀 ~ file: Tiled.tsx ~ line 46 ~ clearFilter', clearFilter);
    const fieldCount = originFieldCount ?? 0;
    const isNeedMore = fieldList.length > fieldCount;
    //展开收起，展开收起的前提是字段个数是否超过限制个数
    const [isOpen, setIsOpen] = React.useState(isNeedMore);

    const changeOpen = React.useCallback(() => {
      setIsOpen((o) => {
        const nextVal = !o;
        onOpen && onOpen(o);
        return nextVal;
      });
    }, [onOpen]);

    const sliceList = React.useMemo(() => {
      //显示的字段条数，展开就显示所有，不然就只显示当前限制的个数
      const displayFieldCount = isOpen ? fieldCount : fieldList.length;
      return isOpen ? fieldList.slice(0, displayFieldCount) : fieldList;
    }, [fieldCount, fieldList, isOpen]);

    return (
      <React.Fragment>
        <div className={prefixCls}>
          <Scrollbar key="Tiled-scrollbar">
            <div ref={ref}>
              {map(sliceList, (field) => {
                const filter = getFieldFilter(field.detail, suppFilter);
                return (
                  <TiledFieldItem
                    key={field.detail.uuid}
                    field={field}
                    fieldFilter={filter}
                    changeItem={changeItem}
                    options={fieldValueObj[field.detail.uuid]}
                    textLabels={textLabels}
                    renderRestLabel={renderRestLabel}
                  />
                );
              })}
            </div>
          </Scrollbar>
        </div>
        {(isNeedMore || startAnalysisProps?.isConfirmFilter || clearFilter) && (
          <TiledFilterFooter
            isOpen={isOpen}
            changeOpen={changeOpen}
            startAnalysis={startAnalysis}
            isNeedMore={isNeedMore}
            startAnalysisProps={startAnalysisProps}
            textLabels={textLabels}
            clearFilter={clearFilter}
          />
        )}
      </React.Fragment>
    );
  },
);

export default TiledFilter;
