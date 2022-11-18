import * as React from 'react';
import { ReactComponent as Icon } from './chart-sankey-diagram-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-sankey-diagram-off`));

const ChartSankeyDiagramOff = createIcon([Icon, LightIcon]);
export default React.memo(ChartSankeyDiagramOff);
