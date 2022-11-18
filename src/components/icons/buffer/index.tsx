import * as React from 'react';
import { ReactComponent as Icon } from './buffer.svg';
import createIcon from '../create-icon';

const Buffer = createIcon(Icon);
export default React.memo(Buffer);
