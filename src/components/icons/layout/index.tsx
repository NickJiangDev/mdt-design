import * as React from 'react';
import { ReactComponent as Icon } from './layout.svg';
import createIcon from '../create-icon';

const Layout = createIcon(Icon);
export default React.memo(Layout);
