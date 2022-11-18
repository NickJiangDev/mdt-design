import * as React from 'react';
import { ReactComponent as Icon } from './help-outlined.svg';
import createIcon from '../create-icon';

const HelpOutlined = createIcon(Icon);
export default React.memo(HelpOutlined);
