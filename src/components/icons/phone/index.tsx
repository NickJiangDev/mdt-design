import * as React from 'react';
import { ReactComponent as Icon } from './phone.svg';
import createIcon from '../create-icon';

const Phone = createIcon(Icon);
export default React.memo(Phone);
