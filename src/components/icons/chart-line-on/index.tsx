import * as React from 'react';
import { ReactComponent as Icon } from './chart-line-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-line-on`));

const ChartLineOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartLineOn);
