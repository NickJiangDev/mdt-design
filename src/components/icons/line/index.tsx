import * as React from 'react';
import { ReactComponent as Icon } from './line.svg';
import createIcon from '../create-icon';

const Line = createIcon(Icon);
export default React.memo(Line);
