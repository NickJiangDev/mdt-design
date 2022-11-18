import * as React from 'react';
import { ReactComponent as Icon } from './map-outlined.svg';
import createIcon from '../create-icon';

const MapOutlined = createIcon(Icon);
export default React.memo(MapOutlined);
