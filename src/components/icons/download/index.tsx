import * as React from 'react';
import { ReactComponent as Icon } from './download.svg';
import createIcon from '../create-icon';

const Download = createIcon(Icon);
export default React.memo(Download);
