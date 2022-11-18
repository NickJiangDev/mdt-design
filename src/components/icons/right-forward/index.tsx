import * as React from 'react';
import { ReactComponent as Icon } from './right-forward.svg';
import createIcon from '../create-icon';

const RightForward = createIcon(Icon);
export default React.memo(RightForward);
