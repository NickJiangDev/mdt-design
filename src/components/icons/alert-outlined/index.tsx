import * as React from 'react';
import { ReactComponent as Icon } from './alert-outlined.svg';
import createIcon from '../create-icon';

const AlertOutlined = createIcon(Icon);
export default React.memo(AlertOutlined);
