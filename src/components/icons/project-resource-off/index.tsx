import * as React from 'react';
import { ReactComponent as Icon } from './project-resource-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-project-resource-off`));

const ProjectResourceOff = createIcon([Icon, LightIcon]);
export default React.memo(ProjectResourceOff);
