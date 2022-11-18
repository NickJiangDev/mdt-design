import * as React from 'react';
import { ReactComponent as Icon } from './sharp.svg';
import createIcon from '../create-icon';

const Sharp = createIcon(Icon);
export default React.memo(Sharp);
