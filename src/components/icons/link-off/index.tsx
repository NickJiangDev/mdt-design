import * as React from 'react';
import { ReactComponent as Icon } from './link-off.svg';
import createIcon from '../create-icon';

const LinkOff = createIcon(Icon);
export default React.memo(LinkOff);
