import * as React from 'react';
import { ReactComponent as Icon } from './chart-scatter-diagram-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-scatter-diagram-on`));

const ChartScatterDiagramOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartScatterDiagramOn);
