import * as React from 'react';
import { ReactComponent as Icon } from './list-view-map.svg';
import createIcon from '../create-icon';

const ListViewMap = createIcon(Icon);
export default React.memo(ListViewMap);
