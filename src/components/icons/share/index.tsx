import * as React from 'react';
import { ReactComponent as Icon } from './share.svg';
import createIcon from '../create-icon';

const Share = createIcon(Icon);
export default React.memo(Share);
