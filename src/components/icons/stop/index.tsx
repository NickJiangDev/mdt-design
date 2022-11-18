import * as React from 'react';
import { ReactComponent as Icon } from './stop.svg';
import createIcon from '../create-icon';

const stop = createIcon(Icon);
export default React.memo(stop);
