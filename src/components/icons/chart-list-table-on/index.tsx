import * as React from 'react';
import { ReactComponent as Icon } from './chart-list-table-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-list-table-on`));

const ChartListTableOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartListTableOn);
