import * as React from 'react';
import { ReactComponent as Icon } from './play-outlined.svg';
import createIcon from '../create-icon';

const PlayOutline = createIcon(Icon);
export default React.memo(PlayOutline);
