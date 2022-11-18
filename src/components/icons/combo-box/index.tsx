import * as React from 'react';
import { ReactComponent as Icon } from './combo-box.svg';
import createIcon from '../create-icon';

const ComboBox = createIcon(Icon);
export default React.memo(ComboBox);
