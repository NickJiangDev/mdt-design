import * as React from 'react';
import { ReactComponent as Icon } from './task-center.svg';
import createIcon from '../create-icon';

const TaskCenter = createIcon(Icon);
export default React.memo(TaskCenter);
