import * as React from 'react';
import { ReactComponent as Icon } from './drag-handle-cornor.svg';
import createIcon from '../create-icon';

const DragHandleCornor = createIcon(Icon);
export default React.memo(DragHandleCornor);
