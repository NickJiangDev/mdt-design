import * as React from 'react';
import { ReactComponent as Icon } from './play.svg';
import createIcon from '../create-icon';

const Play = createIcon(Icon);
export default React.memo(Play);
