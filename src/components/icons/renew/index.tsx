import * as React from 'react';
import { ReactComponent as Icon } from './renew.svg';
import createIcon from '../create-icon';

const Renew = createIcon(Icon);
export default React.memo(Renew);
