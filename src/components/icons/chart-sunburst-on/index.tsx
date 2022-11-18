import * as React from 'react';
import { ReactComponent as Icon } from './chart-sunburst-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-sunburst-on`));

const ChartSunburstOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartSunburstOn);
