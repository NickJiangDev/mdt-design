import * as React from 'react';
import { ReactComponent as Icon } from './star-on.svg';
import createIcon from '../create-icon';

const StarOn = createIcon(Icon);
export default React.memo(StarOn);
