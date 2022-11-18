import * as React from 'react';
import { ReactComponent as Icon } from './polygon-pointer.svg';
import createIcon from '../create-icon';

const PolygonPointer = createIcon(Icon);
export default React.memo(PolygonPointer);
