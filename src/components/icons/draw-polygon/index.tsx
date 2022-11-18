import * as React from 'react';
import { ReactComponent as Icon } from './draw-polygon.svg';
import createIcon from '../create-icon';

const DrawPolygon = createIcon(Icon);
export default React.memo(DrawPolygon);
