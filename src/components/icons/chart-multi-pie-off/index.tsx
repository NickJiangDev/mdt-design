import * as React from 'react';
import { ReactComponent as Icon } from './chart-multi-pie-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-multi-pie-off`));

const ChartMultiPieOff = createIcon([Icon, LightIcon]);
export default React.memo(ChartMultiPieOff);
