import * as React from 'react';
import { ReactComponent as Icon } from './help.svg';
import createIcon from '../create-icon';

const Help = createIcon(Icon);
export default React.memo(Help);
