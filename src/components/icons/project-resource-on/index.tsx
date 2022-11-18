import * as React from 'react';
import { ReactComponent as Icon } from './project-resource-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-project-resource-on`));

const ProjectResourceOn = createIcon([Icon, LightIcon]);
export default React.memo(ProjectResourceOn);
