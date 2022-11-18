import * as React from 'react';
import { ReactComponent as Icon } from './axis-left.svg';
import createIcon from '../create-icon';

const AxisLeft = createIcon(Icon);
export default React.memo(AxisLeft);
