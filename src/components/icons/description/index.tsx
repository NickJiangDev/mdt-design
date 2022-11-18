import * as React from 'react';
import { ReactComponent as Icon } from './description.svg';
import createIcon from '../create-icon';

const Description = createIcon(Icon);
export default React.memo(Description);
