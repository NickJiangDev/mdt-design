import * as React from 'react';
import { ReactComponent as Icon } from './undo.svg';
import createIcon from '../create-icon';

const Undo = createIcon(Icon);
export default React.memo(Undo);
