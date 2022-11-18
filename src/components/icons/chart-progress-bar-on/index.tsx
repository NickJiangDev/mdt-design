import * as React from 'react';
import { ReactComponent as Icon } from './chart-progress-bar-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-progress-bar-on`));

const ChartProgressBarOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartProgressBarOn);
