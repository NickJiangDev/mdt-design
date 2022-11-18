import * as React from 'react';
import { ReactComponent as Icon } from './time-clock.svg';
import createIcon from '../create-icon';

const TimeClock = createIcon(Icon);
export default React.memo(TimeClock);
