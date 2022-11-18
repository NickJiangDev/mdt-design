import * as React from 'react';
import { ReactComponent as Icon } from './drill.svg';
import createIcon from '../create-icon';

const Drill = createIcon(Icon);
export default React.memo(Drill);
