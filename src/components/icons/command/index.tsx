import * as React from 'react';
import { ReactComponent as Icon } from './command.svg';
import createIcon from '../create-icon';

const Command = createIcon(Icon);
export default React.memo(Command);
