import * as React from 'react';
import { ReactComponent as Icon } from './project-bot-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-project-bot-off`));

const ProjectBotOff = createIcon([Icon, LightIcon]);
export default React.memo(ProjectBotOff);
