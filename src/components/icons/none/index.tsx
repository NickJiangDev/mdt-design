import * as React from 'react';
import { ReactComponent as Icon } from './none.svg';
import createIcon from '../create-icon';

const None = createIcon(Icon);
export default React.memo(None);
