import * as React from 'react';
import { ReactComponent as Icon } from './chart-percent-bar-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-percent-bar-on`));

const ChartPercentBarOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartPercentBarOn);
