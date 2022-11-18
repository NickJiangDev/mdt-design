import * as React from 'react';
import { ReactComponent as Icon } from './redo.svg';
import createIcon from '../create-icon';

const Redo = createIcon(Icon);
export default React.memo(Redo);
