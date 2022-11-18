import * as React from 'react';
import { ReactComponent as Icon } from './swap-horiz.svg';
import createIcon from '../create-icon';

const SwapHoriz = createIcon(Icon);
export default React.memo(SwapHoriz);
