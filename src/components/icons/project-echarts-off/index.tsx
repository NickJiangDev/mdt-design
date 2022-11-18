import * as React from 'react';
import { ReactComponent as Icon } from './project-echarts-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-project-echarts-off`));

const ProjectEchartsOff = createIcon([Icon, LightIcon]);
export default React.memo(ProjectEchartsOff);
