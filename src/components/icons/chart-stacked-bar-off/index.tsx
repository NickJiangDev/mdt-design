import * as React from 'react';
import { ReactComponent as Icon } from './chart-stacked-bar-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-stacked-bar-off`));

const ChartStackedBarOff = createIcon([Icon, LightIcon]);
export default React.memo(ChartStackedBarOff);
