import * as React from 'react';
import { ReactComponent as Icon } from './tab.svg';
import createIcon from '../create-icon';

const Tab = createIcon(Icon);
export default React.memo(Tab);
