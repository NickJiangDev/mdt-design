import * as React from 'react';
import { ReactComponent as Icon } from './app-list.svg';
import createIcon from '../create-icon';

const AppList = createIcon(Icon);
export default React.memo(AppList);
