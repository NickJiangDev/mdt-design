import * as React from 'react';
import { ReactComponent as Icon } from './ai-lab.svg';
import createIcon from '../create-icon';

const AiLab = createIcon(Icon);
export default React.memo(AiLab);
