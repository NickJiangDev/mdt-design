import * as React from 'react';
import { ReactComponent as Icon } from './check-box.svg';
import createIcon from '../create-icon';

const CheckBox = createIcon(Icon);
export default React.memo(CheckBox);
