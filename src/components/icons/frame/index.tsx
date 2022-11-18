import * as React from 'react';
import { ReactComponent as Icon } from './frame.svg';
import createIcon from '../create-icon';

const Frame = createIcon(Icon);
export default React.memo(Frame);
