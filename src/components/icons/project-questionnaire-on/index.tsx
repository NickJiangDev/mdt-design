import * as React from 'react';
import { ReactComponent as Icon } from './project-questionnaire-on.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-project-questionnaire-on`));

const ProjectQuestionnaireOn = createIcon([Icon, LightIcon]);
export default React.memo(ProjectQuestionnaireOn);
