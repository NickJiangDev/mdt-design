import * as React from 'react';
import { ReactComponent as Icon } from './chevron-left.svg';
import createIcon from '../create-icon';

const ChevronLeft = createIcon(Icon);
export default React.memo(ChevronLeft);
