import * as React from 'react';
import { ReactComponent as Icon } from './lock-on.svg';
import createIcon from '../create-icon';

const LockOn = createIcon(Icon);
export default React.memo(LockOn);
