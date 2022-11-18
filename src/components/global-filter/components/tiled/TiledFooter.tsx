import { IconButton } from '@/components/button';
import * as React from 'react';
import AnalysisBtn from '../AnalysisBtn';
import { StartAnalysisProps, TextLabelsProps } from '../interface';

const prefixCls = `dmc-global-filter-tf`;

export interface TiledFilterFooterProps {
  isNeedMore: boolean;
  isOpen: boolean;
  startAnalysis: VoidFunction;
  changeOpen: VoidFunction;
  startAnalysisProps?: StartAnalysisProps;
  textLabels?: TextLabelsProps;
  clearFilter?: VoidFunction;
}

const TiledFilterFooter: React.FC<TiledFilterFooterProps> = React.memo(
  ({
    startAnalysisProps,
    isOpen,
    changeOpen,
    startAnalysis,
    isNeedMore,
    textLabels,
    clearFilter,
  }) => {
    const moreNode = React.useMemo(() => {
      return (
        isNeedMore && (
          <div className={`${prefixCls}-footer-label`} onClick={changeOpen}>
            {!isOpen ? textLabels?.collapse : textLabels?.expand}
          </div>
        )
      );
    }, [isNeedMore, changeOpen, isOpen, textLabels?.collapse, textLabels?.expand]);

    return (
      <div className={`${prefixCls}-footer ${prefixCls}-row`}>
        {clearFilter && <IconButton icon="reset" type="only-icon" onClick={clearFilter} />}
        {moreNode}
        <AnalysisBtn
          className={`${prefixCls}-analysis-button`}
          startAnalysis={startAnalysis}
          startAnalysisProps={startAnalysisProps}
        />
      </div>
    );
  },
);

export default TiledFilterFooter;
