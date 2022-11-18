import * as React from 'react';
import { ReactComponent as Icon } from './user.svg';
import createIcon from '../create-icon';

const User = createIcon(Icon);
export default React.memo(User);
