import * as React from 'react';
import { ReactComponent as Icon } from './un-group.svg';
import createIcon from '../create-icon';

const UnGroup = createIcon(Icon);
export default React.memo(UnGroup);
