import * as React from 'react';
import { ReactComponent as Icon } from './project-mobile-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-project-mobile-on`));

const ProjectMobileOn = createIcon([Icon, LightIcon]);
export default React.memo(ProjectMobileOn);
