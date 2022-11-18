import * as React from 'react';
import { ReactComponent as Icon } from './chart-rose-pie-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-rose-pie-on`));

const ChartRosePieOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartRosePieOn);
