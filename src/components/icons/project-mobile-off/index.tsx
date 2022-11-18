import * as React from 'react';
import { ReactComponent as Icon } from './project-mobile-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-project-mobile-off`));

const ProjectMobileOff = createIcon([Icon, LightIcon]);
export default React.memo(ProjectMobileOff);
