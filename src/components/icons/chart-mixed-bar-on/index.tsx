import * as React from 'react';
import { ReactComponent as Icon } from './chart-mixed-bar-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-mixed-bar-on`));

const ChartMixedBarOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartMixedBarOn);
