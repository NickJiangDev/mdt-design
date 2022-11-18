import * as React from 'react';
import { ReactComponent as Icon } from './chevron-right.svg';
import createIcon from '../create-icon';

const ChevronRight = createIcon(Icon);
export default React.memo(ChevronRight);
