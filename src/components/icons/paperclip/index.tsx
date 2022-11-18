import * as React from 'react';
import { ReactComponent as Icon } from './paperclip.svg';
import createIcon from '../create-icon';

const Paperclip = createIcon(Icon);
export default React.memo(Paperclip);
