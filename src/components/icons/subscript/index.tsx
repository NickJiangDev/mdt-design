import * as React from 'react';
import { ReactComponent as Icon } from './subscript.svg';
import createIcon from '../create-icon';

const Subscript = createIcon(Icon);
export default React.memo(Subscript);
