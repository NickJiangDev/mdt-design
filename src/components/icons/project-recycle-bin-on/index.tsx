import * as React from 'react';
import { ReactComponent as Icon } from './project-recycle-bin-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-project-recycle-bin-on`));

const ProjectRecycleBinOn = createIcon([Icon, LightIcon]);
export default React.memo(ProjectRecycleBinOn);
