import * as React from 'react';
import { ReactComponent as Icon } from './time-outlined.svg';
import createIcon from '../create-icon';

const TimeOutlined = createIcon(Icon);
export default React.memo(TimeOutlined);
