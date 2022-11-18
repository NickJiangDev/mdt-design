import * as React from 'react';
import { ReactComponent as Icon } from './small-app-grid.svg';
import createIcon from '../create-icon';

const SmallAppGrid = createIcon(Icon);
export default React.memo(SmallAppGrid);
