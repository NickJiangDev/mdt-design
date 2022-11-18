import * as React from 'react';
import { ReactComponent as Icon } from './chart-gauge-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-gauge-on`));

const ChartGaugeOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartGaugeOn);
