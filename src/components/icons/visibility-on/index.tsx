import * as React from 'react';
import { ReactComponent as Icon } from './visibility-on.svg';
import createIcon from '../create-icon';

const VisibilityOn = createIcon(Icon);
export default React.memo(VisibilityOn);
