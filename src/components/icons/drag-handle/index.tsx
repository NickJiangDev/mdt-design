import * as React from 'react';
import { ReactComponent as Icon } from './drag-handle.svg';
import createIcon from '../create-icon';

const DragHandle = createIcon(Icon);
export default React.memo(DragHandle);
