import * as React from 'react';
import { ReactComponent as Icon } from './row-limit.svg';
import createIcon from '../create-icon';

const RowLimit = createIcon(Icon);
export default React.memo(RowLimit);
