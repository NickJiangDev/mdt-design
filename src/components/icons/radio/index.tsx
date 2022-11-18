import * as React from 'react';
import { ReactComponent as Icon } from './radio.svg';
import createIcon from '../create-icon';

const Radio = createIcon(Icon);
export default React.memo(Radio);
