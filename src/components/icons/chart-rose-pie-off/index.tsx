import * as React from 'react';
import { ReactComponent as Icon } from './chart-rose-pie-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-rose-pie-off`));

const ChartRosePieOff = createIcon([Icon, LightIcon]);
export default React.memo(ChartRosePieOff);
