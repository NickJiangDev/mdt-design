import * as React from 'react';
import { ReactComponent as Icon } from './lock-off.svg';
import createIcon from '../create-icon';

const LockOff = createIcon(Icon);
export default React.memo(LockOff);
