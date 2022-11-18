import * as React from 'react';
import { ReactComponent as Icon } from './refresh.svg';
import createIcon from '../create-icon';

const Refresh = createIcon(Icon);
export default React.memo(Refresh);
