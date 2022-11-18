import * as React from 'react';
import { ReactComponent as Icon } from './setting.svg';
import createIcon from '../create-icon';

const Setting = createIcon(Icon);
export default React.memo(Setting);
