import * as React from 'react';
import { ReactComponent as Icon } from './chart-map-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-map-off`));

const ChartMapOff = createIcon([Icon, LightIcon]);
export default React.memo(ChartMapOff);
