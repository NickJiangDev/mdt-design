import * as React from 'react';
import { ReactComponent as Icon } from './format-italic.svg';
import createIcon from '../create-icon';

const FormatItalic = createIcon(Icon);
export default React.memo(FormatItalic);
