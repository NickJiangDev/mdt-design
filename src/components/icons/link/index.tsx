import * as React from 'react';
import { ReactComponent as Icon } from './link.svg';
import createIcon from '../create-icon';

const Link = createIcon(Icon);
export default React.memo(Link);
