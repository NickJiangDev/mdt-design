import * as React from 'react';
import { ReactComponent as Icon } from './arrow-left.svg';
import createIcon from '../create-icon';

const ArrowLeft = createIcon(Icon);
export default React.memo(ArrowLeft);
