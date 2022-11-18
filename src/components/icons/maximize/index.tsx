import * as React from 'react';
import { ReactComponent as Icon } from './maximize.svg';
import createIcon from '../create-icon';

const Maximize = createIcon(Icon);
export default React.memo(Maximize);
