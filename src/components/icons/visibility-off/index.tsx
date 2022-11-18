import * as React from 'react';
import { ReactComponent as Icon } from './visibility-off.svg';
import createIcon from '../create-icon';

const VisibilityOff = createIcon(Icon);
export default React.memo(VisibilityOff);
