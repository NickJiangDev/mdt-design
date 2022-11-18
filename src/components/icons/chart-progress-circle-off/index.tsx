import * as React from 'react';
import { ReactComponent as Icon } from './chart-progress-circle-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-progress-circle-off`));

const ChartProgressCircleOff = createIcon([Icon, LightIcon]);
export default React.memo(ChartProgressCircleOff);
