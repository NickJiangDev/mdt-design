import * as React from 'react';
import { ReactComponent as Icon } from './navigation-outlined.svg';
import createIcon from '../create-icon';

const NavigationOutlined = createIcon(Icon);
export default React.memo(NavigationOutlined);
