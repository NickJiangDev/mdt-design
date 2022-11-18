import * as React from 'react';
import { ReactComponent as Icon } from './chart-gauge-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-gauge-off`));

const ChartGaugeOff = createIcon([Icon, LightIcon]);
export default React.memo(ChartGaugeOff);
