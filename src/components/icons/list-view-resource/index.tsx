import * as React from 'react';
import { ReactComponent as Icon } from './list-view-resource.svg';
import createIcon from '../create-icon';

const ListViewResource = createIcon(Icon);
export default React.memo(ListViewResource);
