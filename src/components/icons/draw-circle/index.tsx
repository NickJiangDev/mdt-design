import * as React from 'react';
import { ReactComponent as Icon } from './draw-circle.svg';
import createIcon from '../create-icon';

const DrawCircle = createIcon(Icon);
export default React.memo(DrawCircle);
