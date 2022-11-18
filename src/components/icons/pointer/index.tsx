import * as React from 'react';
import { ReactComponent as Icon } from './pointer.svg';
import createIcon from '../create-icon';

const Pointer = createIcon(Icon);
export default React.memo(Pointer);
