import * as React from 'react';
import { ReactComponent as Icon } from './chart-sankey-diagram-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-sankey-diagram-on`));

const ChartSankeyDiagramOn = createIcon([Icon, LightIcon]);
export default React.memo(ChartSankeyDiagramOn);
