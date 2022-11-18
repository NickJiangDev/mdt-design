import * as React from 'react';
import { ReactComponent as Icon } from './list-view-standard.svg';
import createIcon from '../create-icon';

const ListViewStandard = createIcon(Icon);
export default React.memo(ListViewStandard);
