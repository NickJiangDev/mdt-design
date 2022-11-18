import * as React from 'react';
import { ReactComponent as Icon } from './location-outlined.svg';
import createIcon from '../create-icon';

const LocationOutlined = createIcon(Icon);
export default React.memo(LocationOutlined);
