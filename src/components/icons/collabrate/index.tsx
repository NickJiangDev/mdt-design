import * as React from 'react';
import { ReactComponent as Icon } from './collabrate.svg';
import createIcon from '../create-icon';

const Collabrate = createIcon(Icon);
export default React.memo(Collabrate);
