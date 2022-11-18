import * as React from 'react';
import { ReactComponent as Icon } from './project-lab-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-project-lab-off`));

const ProjectLabOff = createIcon([Icon, LightIcon]);
export default React.memo(ProjectLabOff);
