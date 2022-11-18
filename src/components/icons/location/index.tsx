import * as React from 'react';
import { ReactComponent as Icon } from './location.svg';
import createIcon from '../create-icon';

const Location = createIcon(Icon);
export default React.memo(Location);
