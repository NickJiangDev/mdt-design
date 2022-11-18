import * as React from 'react';
import { ReactComponent as Icon } from './sort.svg';
import createIcon from '../create-icon';

const Sort = createIcon(Icon);
export default React.memo(Sort);
