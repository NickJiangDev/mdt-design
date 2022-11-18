import * as React from 'react';
import { ReactComponent as Icon } from './team.svg';
import createIcon from '../create-icon';

const Team = createIcon(Icon);
export default React.memo(Team);
