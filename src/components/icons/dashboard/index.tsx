import * as React from 'react';
import { ReactComponent as Icon } from './dashboard.svg';
import createIcon from '../create-icon';

const Dashboard = createIcon(Icon);
export default React.memo(Dashboard);
