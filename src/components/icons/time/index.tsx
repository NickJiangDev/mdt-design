import * as React from 'react';
import { ReactComponent as Icon } from './time.svg';
import createIcon from '../create-icon';

const Time = createIcon(Icon);
export default React.memo(Time);
