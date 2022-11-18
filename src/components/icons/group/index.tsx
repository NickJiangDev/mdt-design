import * as React from 'react';
import { ReactComponent as Icon } from './group.svg';
import createIcon from '../create-icon';

const Group = createIcon(Icon);
export default React.memo(Group);
