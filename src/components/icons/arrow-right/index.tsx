import * as React from 'react';
import { ReactComponent as Icon } from './arrow-right.svg';
import createIcon from '../create-icon';

const ArrowRight = createIcon(Icon);
export default React.memo(ArrowRight);
