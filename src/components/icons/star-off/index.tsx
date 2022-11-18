import * as React from 'react';
import { ReactComponent as Icon } from './star-off.svg';
import createIcon from '../create-icon';

const StarOff = createIcon(Icon);
export default React.memo(StarOff);
