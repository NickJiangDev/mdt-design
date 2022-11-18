import * as React from 'react';
import { ReactComponent as Icon } from './location-to-location.svg';
import createIcon from '../create-icon';

const LocationToLocation = createIcon(Icon);
export default React.memo(LocationToLocation);
