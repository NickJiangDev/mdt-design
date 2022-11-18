import * as React from 'react';
import { ReactComponent as Icon } from './format-color-text.svg';
import createIcon from '../create-icon';

const FormatColorText = createIcon(Icon);
export default React.memo(FormatColorText);
