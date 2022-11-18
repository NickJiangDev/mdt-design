import * as React from 'react';
import { ReactComponent as Icon } from './geo-global.svg';
import createIcon from '../create-icon';

const GeoGlobal = createIcon(Icon);
export default React.memo(GeoGlobal);
