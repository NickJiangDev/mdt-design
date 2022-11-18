import * as React from 'react';
import { ReactComponent as Icon } from './location-to-polygon.svg';
import createIcon from '../create-icon';

const LocationToPolygon = createIcon(Icon);
export default React.memo(LocationToPolygon);
