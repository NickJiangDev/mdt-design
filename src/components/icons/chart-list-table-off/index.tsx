import * as React from 'react';
import { ReactComponent as Icon } from './chart-list-table-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-list-table-off`));

const ChartListTableOff = createIcon([Icon, LightIcon]);
export default React.memo(ChartListTableOff);
