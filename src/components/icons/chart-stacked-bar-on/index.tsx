import * as React from 'react';
import { ReactComponent as Icon } from './chart-stacked-bar-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-stacked-bar-on`));

const ChartStackedBarOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartStackedBarOn);
