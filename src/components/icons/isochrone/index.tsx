import * as React from 'react';
import { ReactComponent as Icon } from './isochrone.svg';
import createIcon from '../create-icon';

const Isochrone = createIcon(Icon);
export default React.memo(Isochrone);
