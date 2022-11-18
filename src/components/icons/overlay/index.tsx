import * as React from 'react';
import { ReactComponent as Icon } from './overlay.svg';
import createIcon from '../create-icon';

const Overlay = createIcon(Icon);
export default React.memo(Overlay);
