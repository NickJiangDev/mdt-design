import * as React from 'react';
import { ReactComponent as Icon } from './chart-scatter-diagram-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-chart-scatter-diagram-off`));

const ChartScatterDiagramOff = createIcon([Icon, LightIcon]);
export default React.memo(ChartScatterDiagramOff);
