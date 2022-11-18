import * as React from 'react';
import { ReactComponent as Icon } from './project-map-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-project-map-on`));

const ProjectMapOn = createIcon([Icon, LightIcon]);
export default React.memo(ProjectMapOn);
