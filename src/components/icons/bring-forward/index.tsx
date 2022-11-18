import * as React from 'react';
import { ReactComponent as Icon } from './bring-forward.svg';
import createIcon from '../create-icon';

const BringForward = createIcon(Icon);
export default React.memo(BringForward);
