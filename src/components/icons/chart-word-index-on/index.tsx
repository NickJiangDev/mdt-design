import * as React from 'react';
import { ReactComponent as Icon } from './chart-word-index-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-word-index-on`));

const ChartWordIndexOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartWordIndexOn);
