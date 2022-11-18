import * as React from 'react';
import { ReactComponent as Icon } from './success.svg';
import createIcon from '../create-icon';

const Success = createIcon(Icon);
export default React.memo(Success);
