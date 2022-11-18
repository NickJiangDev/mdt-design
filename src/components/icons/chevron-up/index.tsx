import * as React from 'react';
import { ReactComponent as Icon } from './chevron-up.svg';
import createIcon from '../create-icon';

const ChevronUp = createIcon(Icon);
export default React.memo(ChevronUp);
