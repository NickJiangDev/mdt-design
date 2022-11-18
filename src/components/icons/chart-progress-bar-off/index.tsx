import * as React from 'react';
import { ReactComponent as Icon } from './chart-progress-bar-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-progress-bar-off`));

const ChartProgressBarOff = createIcon([Icon, LightIcon]);
export default React.memo(ChartProgressBarOff);
