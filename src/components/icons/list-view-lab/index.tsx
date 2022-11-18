import * as React from 'react';
import { ReactComponent as Icon } from './list-view-lab.svg';
import createIcon from '../create-icon';

const ListViewLab = createIcon(Icon);
export default React.memo(ListViewLab);
