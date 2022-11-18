import * as React from 'react';
import { ReactComponent as Icon } from './close.svg';
import createIcon from '../create-icon';

const Close = createIcon(Icon);
export default React.memo(Close);
