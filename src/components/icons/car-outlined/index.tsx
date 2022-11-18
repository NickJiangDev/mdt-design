import * as React from 'react';
import { ReactComponent as Icon } from './car-outlined.svg';
import createIcon from '../create-icon';

const CarOutlined = createIcon(Icon);
export default React.memo(CarOutlined);
