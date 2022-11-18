import * as React from 'react';
import { ReactComponent as Icon } from './stack.svg';
import createIcon from '../create-icon';

const Stack = createIcon(Icon);
export default React.memo(Stack);
