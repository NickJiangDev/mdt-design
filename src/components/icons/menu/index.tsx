import * as React from 'react';
import { ReactComponent as Icon } from './menu.svg';
import createIcon from '../create-icon';

const Menu = createIcon(Icon);
export default React.memo(Menu);
