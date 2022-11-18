import * as React from 'react';
import { ReactComponent as Icon } from './street-view.svg';
import createIcon from '../create-icon';

const StreetView = createIcon(Icon);
export default React.memo(StreetView);
