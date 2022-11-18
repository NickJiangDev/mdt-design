import * as React from 'react';
import { ReactComponent as Icon } from './list-view-chart.svg';
import createIcon from '../create-icon';

const ListViewChart = createIcon(Icon);
export default React.memo(ListViewChart);
