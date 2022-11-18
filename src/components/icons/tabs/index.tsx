import * as React from 'react';
import { ReactComponent as Icon } from './tabs.svg';
import createIcon from '../create-icon';

const Tabs = createIcon(Icon);
export default React.memo(Tabs);
