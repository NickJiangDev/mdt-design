import * as React from 'react';
import { ReactComponent as Icon } from './checkbox-off.svg';
import createIcon from '../create-icon';

const CheckboxOff = createIcon(Icon);
export default React.memo(CheckboxOff);
