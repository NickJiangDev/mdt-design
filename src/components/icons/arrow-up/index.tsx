import * as React from 'react';
import { ReactComponent as Icon } from './arrow-up.svg';
import createIcon from '../create-icon';

const ArrowUp = createIcon(Icon);
export default React.memo(ArrowUp);
