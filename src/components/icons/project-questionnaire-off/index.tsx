import * as React from 'react';
import { ReactComponent as Icon } from './project-questionnaire-off.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-project-questionnaire-off`));

const ProjectQuestionnaireOff = createIcon([Icon, LightIcon]);
export default React.memo(ProjectQuestionnaireOff);
