import * as React from 'react';
import { ReactComponent as Icon } from './new-questionnaire.svg';
import createIcon from '../create-icon';

const NewQuestionnaire = createIcon(Icon);
export default React.memo(NewQuestionnaire);
