import * as React from 'react';
import { ReactComponent as Icon } from './pack-up.svg';
import createIcon from '../create-icon';

const PackUp = createIcon(Icon);
export default React.memo(PackUp);
