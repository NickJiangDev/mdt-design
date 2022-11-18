import * as React from 'react';
import { ReactComponent as Icon } from './chart-three-dimensional-table-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-three-dimensional-table-off`));

const ChartThreeDimensionalTableOff = createIcon([Icon, LightIcon]);
export default React.memo(ChartThreeDimensionalTableOff);
