import * as React from 'react';
import { ReactComponent as Icon } from './arrow-down.svg';
import createIcon from '../create-icon';

const ArrowDown = createIcon(Icon);
export default React.memo(ArrowDown);
