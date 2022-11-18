import * as React from 'react';
import { ReactComponent as Icon } from './indent-decrease.svg';
import createIcon from '../create-icon';

const IndentDecrease = createIcon(Icon);
export default React.memo(IndentDecrease);
