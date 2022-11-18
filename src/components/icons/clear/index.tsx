import * as React from 'react';
import { ReactComponent as Icon } from './clear.svg';
import createIcon from '../create-icon';

const Clear = createIcon(Icon);
export default React.memo(Clear);
