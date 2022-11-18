import * as React from 'react';
import { ReactComponent as Icon } from './reset.svg';
import createIcon from '../create-icon';

const Reset = createIcon(Icon);
export default React.memo(Reset);
