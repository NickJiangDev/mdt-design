import * as React from 'react';
import { ReactComponent as Icon } from './pie-chart.svg';
import createIcon from '../create-icon';

const PieChart = createIcon(Icon);
export default React.memo(PieChart);
