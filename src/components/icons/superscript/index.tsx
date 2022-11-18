import * as React from 'react';
import { ReactComponent as Icon } from './superscript.svg';
import createIcon from '../create-icon';

const Superscript = createIcon(Icon);
export default React.memo(Superscript);
