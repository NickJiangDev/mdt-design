import * as React from 'react';
import { ReactComponent as Icon } from './chart-tree-map-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-tree-map-off`));

const ChartTreeMapOff = createIcon([Icon, LightIcon]);
export default React.memo(ChartTreeMapOff);
