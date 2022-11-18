import * as React from 'react';
import { ReactComponent as Icon } from './align-bottom.svg';
import createIcon from '../create-icon';

const AlignBottom = createIcon(Icon);
export default React.memo(AlignBottom);
