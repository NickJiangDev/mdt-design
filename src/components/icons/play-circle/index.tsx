import * as React from 'react';
import { ReactComponent as Icon } from './play-circle.svg';
import createIcon from '../create-icon';

const PlayCircle = createIcon(Icon);
export default React.memo(PlayCircle);
