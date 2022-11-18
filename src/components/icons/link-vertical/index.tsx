import * as React from 'react';
import { ReactComponent as Icon } from './link-vertical.svg';
import createIcon from '../create-icon';

const LinkVertical = createIcon(Icon);
export default React.memo(LinkVertical);
