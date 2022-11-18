import * as React from 'react';
import { ReactComponent as Icon } from './format-strikethrough.svg';
import createIcon from '../create-icon';

const FormatStrikethrough = createIcon(Icon);
export default React.memo(FormatStrikethrough);
