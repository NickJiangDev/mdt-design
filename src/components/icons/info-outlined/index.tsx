import * as React from 'react';
import { ReactComponent as Icon } from './info-outlined.svg';
import createIcon from '../create-icon';

const Info = createIcon(Icon);
export default React.memo(Info);
