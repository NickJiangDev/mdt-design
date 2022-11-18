import * as React from 'react';
import { ReactComponent as Icon } from './fact-check.svg';
import createIcon from '../create-icon';

const FactCheck = createIcon(Icon);
export default React.memo(FactCheck);
