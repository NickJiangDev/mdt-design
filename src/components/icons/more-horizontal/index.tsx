import * as React from 'react';
import { ReactComponent as Icon } from './more-horizontal.svg';
import createIcon from '../create-icon';

const MoreHorizontal = createIcon(Icon);
export default React.memo(MoreHorizontal);
