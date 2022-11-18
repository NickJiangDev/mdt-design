import * as React from 'react';
import { ReactComponent as Icon } from './list-view-customed.svg';
import createIcon from '../create-icon';

const ListViewCustomed = createIcon(Icon);
export default React.memo(ListViewCustomed);
