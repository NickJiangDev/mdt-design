import * as React from 'react';
import { ReactComponent as Icon } from './walker.svg';
import createIcon from '../create-icon';

const Walker = createIcon(Icon);
export default React.memo(Walker);
