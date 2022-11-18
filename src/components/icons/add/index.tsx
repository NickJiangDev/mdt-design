import * as React from 'react';
import { ReactComponent as Icon } from './add.svg';
import createIcon from '../create-icon';

const Add = createIcon(Icon);
export default React.memo(Add);
