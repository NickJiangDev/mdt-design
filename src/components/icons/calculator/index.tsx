import * as React from 'react';
import { ReactComponent as Icon } from './calculator.svg';
import createIcon from '../create-icon';

const Calculator = createIcon(Icon);
export default React.memo(Calculator);
