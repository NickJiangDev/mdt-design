import * as React from 'react';
import { ReactComponent as Icon } from './corner-up-left.svg';
import createIcon from '../create-icon';

const CornerUpLeft = createIcon(Icon);
export default React.memo(CornerUpLeft);
