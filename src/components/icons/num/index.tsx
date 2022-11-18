import * as React from 'react';
import { ReactComponent as Icon } from './num.svg';
import createIcon from '../create-icon';

const Num = createIcon(Icon);
export default React.memo(Num);
