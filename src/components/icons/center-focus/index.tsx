import * as React from 'react';
import { ReactComponent as Icon } from './center-focus.svg';
import createIcon from '../create-icon';

const CenterFocus = createIcon(Icon);
export default React.memo(CenterFocus);
