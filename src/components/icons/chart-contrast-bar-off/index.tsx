import * as React from 'react';
import { ReactComponent as Icon } from './chart-contrast-bar-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-contrast-bar-off`));

const ChartContrastBarOff = createIcon([Icon, LightIcon]);
export default React.memo(ChartContrastBarOff);
