import * as React from 'react';
import { ReactComponent as Icon } from './project-screen-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-project-screen-off`));

const ProjectScreenOff = createIcon([Icon, LightIcon]);
export default React.memo(ProjectScreenOff);
