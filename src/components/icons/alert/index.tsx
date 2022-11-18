import * as React from 'react';
import { ReactComponent as Icon } from './alert.svg';
import createIcon from '../create-icon';

const Alert = createIcon(Icon);
export default React.memo(Alert);
