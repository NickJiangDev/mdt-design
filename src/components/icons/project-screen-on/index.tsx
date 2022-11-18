import * as React from 'react';
import { ReactComponent as Icon } from './project-screen-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-project-screen-on`));

const ProjectScreenOn = createIcon([Icon, LightIcon]);

export default React.memo(ProjectScreenOn);
