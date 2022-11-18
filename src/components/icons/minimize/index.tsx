import * as React from 'react';
import { ReactComponent as Icon } from './minimize.svg';
import createIcon from '../create-icon';

const Minimize = createIcon(Icon);
export default React.memo(Minimize);
