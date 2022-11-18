import * as React from 'react';
import { ReactComponent as Icon } from './app-grid.svg';
import createIcon from '../create-icon';

const AppGrid = createIcon(Icon);
export default React.memo(AppGrid);
