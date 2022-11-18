import * as React from 'react';
import { ReactComponent as Icon } from './chart-three-dimensional-table-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-three-dimensional-table-on`));

const ChartThreeDimensionalTableOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartThreeDimensionalTableOn);
