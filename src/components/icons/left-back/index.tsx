import * as React from 'react';
import { ReactComponent as Icon } from './left-back.svg';
import createIcon from '../create-icon';

const LeftBack = createIcon(Icon);
export default React.memo(LeftBack);
