import * as React from 'react';
import { ReactComponent as Icon } from './chart-bar-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-bar-on`));

const ChartBarOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartBarOn);
