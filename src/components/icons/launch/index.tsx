import * as React from 'react';
import { ReactComponent as Icon } from './launch.svg';
import createIcon from '../create-icon';

const Launch = createIcon(Icon);
export default React.memo(Launch);
