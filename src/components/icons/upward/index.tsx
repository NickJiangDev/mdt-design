import * as React from 'react';
import { ReactComponent as Icon } from './upward.svg';
import createIcon from '../create-icon';

const Upward = createIcon(Icon);
export default React.memo(Upward);
