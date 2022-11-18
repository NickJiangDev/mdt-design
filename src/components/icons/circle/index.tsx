import * as React from 'react';
import { ReactComponent as Icon } from './circle.svg';
import createIcon from '../create-icon';

const Circle = createIcon(Icon);
export default React.memo(Circle);
