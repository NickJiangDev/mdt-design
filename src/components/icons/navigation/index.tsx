import * as React from 'react';
import { ReactComponent as Icon } from './navigation.svg';
import createIcon from '../create-icon';

const Navigation = createIcon(Icon);
export default React.memo(Navigation);
