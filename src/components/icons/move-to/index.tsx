import * as React from 'react';
import { ReactComponent as Icon } from './move-to.svg';
import createIcon from '../create-icon';

const MoveTo = createIcon(Icon);
export default React.memo(MoveTo);
