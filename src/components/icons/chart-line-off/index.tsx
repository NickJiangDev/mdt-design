import * as React from 'react';
import { ReactComponent as Icon } from './chart-line-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-line-off`));

const ChartLineOff = createIcon([Icon, LightIcon]);
export default React.memo(ChartLineOff);
