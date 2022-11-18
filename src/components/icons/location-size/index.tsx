import * as React from 'react';
import { ReactComponent as Icon } from './location-size.svg';
import createIcon from '../create-icon';

const LocationSize = createIcon(Icon);
export default React.memo(LocationSize);
