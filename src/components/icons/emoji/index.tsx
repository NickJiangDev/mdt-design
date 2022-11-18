import * as React from 'react';
import { ReactComponent as Icon } from './emoji.svg';
import createIcon from '../create-icon';

const Emoji = createIcon(Icon);
export default React.memo(Emoji);
