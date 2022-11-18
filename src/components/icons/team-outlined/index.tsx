import * as React from 'react';
import { ReactComponent as Icon } from './team-outlined.svg';
import createIcon from '../create-icon';

const TeamOutlined = createIcon(Icon);
export default React.memo(TeamOutlined);
