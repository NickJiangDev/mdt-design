import * as React from 'react';
import { ReactComponent as Icon } from './success-outlined.svg';
import createIcon from '../create-icon';

const SuccessOutlined = createIcon(Icon);
export default React.memo(SuccessOutlined);
