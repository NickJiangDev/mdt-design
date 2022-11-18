import * as React from 'react';
import { ReactComponent as Icon } from './exit.svg';
import createIcon from '../create-icon';

const Exit = createIcon(Icon);
export default React.memo(Exit);
