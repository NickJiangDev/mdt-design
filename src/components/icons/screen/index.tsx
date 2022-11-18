import * as React from 'react';
import { ReactComponent as Icon } from './screen.svg';
import createIcon from '../create-icon';

const Screen = createIcon(Icon);
export default React.memo(Screen);
