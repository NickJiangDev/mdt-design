import * as React from 'react';
import { ReactComponent as Icon } from './chart-doughnut-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-doughnut-on`));

const ChartDoughnutOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartDoughnutOn);
