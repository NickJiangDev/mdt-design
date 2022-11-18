import * as React from 'react';
import { ReactComponent as Icon } from './screen-shot.svg';
import createIcon from '../create-icon';

const ScreenShot = createIcon(Icon);
export default React.memo(ScreenShot);
