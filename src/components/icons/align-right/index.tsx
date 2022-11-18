import * as React from 'react';
import { ReactComponent as Icon } from './align-right.svg';
import createIcon from '../create-icon';

const AlignRight = createIcon(Icon);
export default React.memo(AlignRight);
