import * as React from 'react';
import { ReactComponent as Icon } from './chevron-down.svg';
import createIcon from '../create-icon';

const ChevronDown = createIcon(Icon);
export default React.memo(ChevronDown);
