import * as React from 'react';
import { ReactComponent as Icon } from './chart-progress-circle-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-progress-circle-on`));

const ChartProgressCircleOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartProgressCircleOn);
