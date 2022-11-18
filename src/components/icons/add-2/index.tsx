import * as React from 'react';
import { ReactComponent as Icon } from './add-2.svg';
import createIcon from '../create-icon';

const Add2 = createIcon(Icon);
export default React.memo(Add2);
