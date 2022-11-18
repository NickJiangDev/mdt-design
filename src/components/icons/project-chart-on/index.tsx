import * as React from 'react';
import { ReactComponent as Icon } from './project-chart-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-project-chart-on`));

const ProjectChartOn = createIcon([Icon, LightIcon]);
export default React.memo(ProjectChartOn);
