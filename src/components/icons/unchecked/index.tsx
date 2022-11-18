import * as React from 'react';
import { ReactComponent as Icon } from './unchecked.svg';
import createIcon from '../create-icon';

const Unchecked = createIcon(Icon);
export default React.memo(Unchecked);
