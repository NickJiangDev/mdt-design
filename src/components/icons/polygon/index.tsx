import * as React from 'react';
import { ReactComponent as Icon } from './polygon.svg';
import createIcon from '../create-icon';

const Polygon = createIcon(Icon);
export default React.memo(Polygon);
