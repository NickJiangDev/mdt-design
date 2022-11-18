import * as React from 'react';
import { ReactComponent as Icon } from './chart-marquee-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-marquee-on`));

const ChartMarqueeOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartMarqueeOn);
