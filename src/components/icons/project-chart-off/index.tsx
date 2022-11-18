import * as React from 'react';
import { ReactComponent as Icon } from './project-chart-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-project-chart-off`));

const ProjectChartOff = createIcon([Icon, LightIcon]);
export default React.memo(ProjectChartOff);
