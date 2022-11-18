import * as React from 'react';
import { ReactComponent as Icon } from './project-bot-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-project-bot-on`));

const ProjectBotOn = createIcon([Icon, LightIcon]);
export default React.memo(ProjectBotOn);
