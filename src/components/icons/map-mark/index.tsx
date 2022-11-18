import * as React from 'react';
import { ReactComponent as Icon } from './map-mark.svg';
import createIcon from '../create-icon';

const MapMark = createIcon(Icon);
export default React.memo(MapMark);
