import * as React from 'react';
import { ReactComponent as Icon } from './indent-increase.svg';
import createIcon from '../create-icon';

const IndentIncrease = createIcon(Icon);
export default React.memo(IndentIncrease);
