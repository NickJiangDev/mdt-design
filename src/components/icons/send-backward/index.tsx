import * as React from 'react';
import { ReactComponent as Icon } from './send-backward.svg';
import createIcon from '../create-icon';

const SendBackward = createIcon(Icon);
export default React.memo(SendBackward);
