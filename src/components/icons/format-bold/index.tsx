import * as React from 'react';
import { ReactComponent as Icon } from './format-bold.svg';
import createIcon from '../create-icon';

const FormatBold = createIcon(Icon);
export default React.memo(FormatBold);
