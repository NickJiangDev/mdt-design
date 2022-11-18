import * as React from 'react';
import { ReactComponent as Icon } from './chart-two-dimensional-table-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-two-dimensional-table-off`));

const ChartTwoDimensionalTableOff = createIcon([Icon, LightIcon]);
export default React.memo(ChartTwoDimensionalTableOff);
