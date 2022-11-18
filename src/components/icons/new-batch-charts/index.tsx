import * as React from 'react';
import { ReactComponent as Icon } from './new-batch-charts.svg';
import createIcon from '../create-icon';

const NewBatchCharts = createIcon(Icon);
export default React.memo(NewBatchCharts);
