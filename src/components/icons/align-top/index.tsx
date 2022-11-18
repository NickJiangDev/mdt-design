import * as React from 'react';
import { ReactComponent as Icon } from './align-top.svg';
import createIcon from '../create-icon';

const AlignTop = createIcon(Icon);
export default React.memo(AlignTop);
