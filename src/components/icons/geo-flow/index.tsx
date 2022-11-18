import * as React from 'react';
import { ReactComponent as Icon } from './geo-flow.svg';
import createIcon from '../create-icon';

const GeoFlow = createIcon(Icon);
export default React.memo(GeoFlow);
