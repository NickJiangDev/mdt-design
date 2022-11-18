import * as React from 'react';
import Button from '@/components/button';
import { StartAnalysisProps } from './interface';

interface AnalysisBtnProps {
  startAnalysis: VoidFunction;
  className?: string;
  startAnalysisProps?: StartAnalysisProps;
}

const AnalysisBtn: React.FC<AnalysisBtnProps> = React.memo(
  ({ startAnalysisProps, startAnalysis: onClick, ...props }) => {
    const { isConfirmFilter, btnLoading: loading, size, title } = startAnalysisProps ?? {};

    return isConfirmFilter ? (
      <Button {...props} onClick={onClick} loading={loading} size={size as 'compact'}>
        {title}
      </Button>
    ) : null;
  },
);

AnalysisBtn.displayName = 'AnalysisBtn';

export default AnalysisBtn;
