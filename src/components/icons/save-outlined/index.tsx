import * as React from 'react';
import { ReactComponent as Icon } from './save-outlined.svg';
import createIcon from '../create-icon';

const SaveOutlined = createIcon(Icon);
export default React.memo(SaveOutlined);
