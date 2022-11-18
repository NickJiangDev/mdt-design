import * as React from 'react';
import { ReactComponent as Icon } from './done-check.svg';
import createIcon from '../create-icon';

const DoneCheck = createIcon(Icon);
export default React.memo(DoneCheck);
