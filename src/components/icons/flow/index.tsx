import * as React from 'react';
import { ReactComponent as Icon } from './flow.svg';
import createIcon from '../create-icon';

const Flow = createIcon(Icon);
export default React.memo(Flow);
