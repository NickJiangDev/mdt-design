import * as React from 'react';
import { ReactComponent as Icon } from './downward.svg';
import createIcon from '../create-icon';

const Downward = createIcon(Icon);
export default React.memo(Downward);
