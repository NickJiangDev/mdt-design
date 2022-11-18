import * as React from 'react';
import { ReactComponent as Icon } from './format-underlined.svg';
import createIcon from '../create-icon';

const FormatUnderlined = createIcon(Icon);
export default React.memo(FormatUnderlined);
