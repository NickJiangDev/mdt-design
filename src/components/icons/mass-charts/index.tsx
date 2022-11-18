import * as React from 'react';
import { ReactComponent as Icon } from './mass-chart.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../mass-charts-light`));

const MassCharts = createIcon([Icon, LightIcon]);
export default React.memo(MassCharts);
