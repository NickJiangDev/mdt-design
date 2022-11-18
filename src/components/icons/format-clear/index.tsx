import * as React from 'react';
import { ReactComponent as Icon } from './format-clear.svg';
import createIcon from '../create-icon';

const FormatClear = createIcon(Icon);
export default React.memo(FormatClear);
