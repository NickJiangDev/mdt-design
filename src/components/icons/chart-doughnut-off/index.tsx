import * as React from 'react';
import { ReactComponent as Icon } from './chart-doughnut-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-doughnut-off`));

const ChartDoughnutOff = createIcon([Icon, LightIcon]);
export default React.memo(ChartDoughnutOff);
