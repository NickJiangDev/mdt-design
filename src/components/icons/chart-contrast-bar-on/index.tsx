import * as React from 'react';
import { ReactComponent as Icon } from './chart-contrast-bar-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-contrast-bar-on`));

const ChartContrastBarOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartContrastBarOn);
