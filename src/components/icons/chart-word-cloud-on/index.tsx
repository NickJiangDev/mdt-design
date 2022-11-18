import * as React from 'react';
import { ReactComponent as Icon } from './chart-word-cloud-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-word-cloud-on`));

const ChartWordCloudOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartWordCloudOn);
