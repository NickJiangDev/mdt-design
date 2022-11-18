import * as React from 'react';
import { ReactComponent as Icon } from './corner-up-right.svg';
import createIcon from '../create-icon';

const CornerUpRight = createIcon(Icon);
export default React.memo(CornerUpRight);
