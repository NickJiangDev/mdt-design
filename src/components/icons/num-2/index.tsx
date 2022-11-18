import * as React from 'react';
import { ReactComponent as Icon } from './num-2.svg';
import createIcon from '../create-icon';

const Num2 = createIcon(Icon);
export default React.memo(Num2);
