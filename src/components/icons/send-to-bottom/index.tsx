import * as React from 'react';
import { ReactComponent as Icon } from './send-to-bottom.svg';
import createIcon from '../create-icon';

const SendToBottom = createIcon(Icon);
export default React.memo(SendToBottom);
