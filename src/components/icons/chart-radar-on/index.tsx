import * as React from 'react';
import { ReactComponent as Icon } from './chart-radar-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-radar-on`));

const ChartRadarOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartRadarOn);
