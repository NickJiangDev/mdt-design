import * as React from 'react';
import { ReactComponent as Icon } from './map.svg';
import createIcon from '../create-icon';

const Map = createIcon(Icon);
export default React.memo(Map);
