import * as React from 'react';
import { ReactComponent as Icon } from './bring-to-top.svg';
import createIcon from '../create-icon';

const BringToTop = createIcon(Icon);
export default React.memo(BringToTop);
