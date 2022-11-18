import * as React from 'react';
import { ReactComponent as Icon } from './checked.svg';
import createIcon from '../create-icon';

const Checked = createIcon(Icon);
export default React.memo(Checked);
