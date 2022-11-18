import * as React from 'react';
import { ReactComponent as Icon } from './chart-mixed-bar-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-mixed-bar-off`));

const ChartMixedBarOff = createIcon([Icon, LightIcon]);
export default React.memo(ChartMixedBarOff);
