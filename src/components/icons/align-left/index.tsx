import * as React from 'react';
import { ReactComponent as Icon } from './align-left.svg';
import createIcon from '../create-icon';

const AlignLeft = createIcon(Icon);
export default React.memo(AlignLeft);
