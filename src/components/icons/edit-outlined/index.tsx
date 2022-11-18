import * as React from 'react';
import { ReactComponent as Icon } from './edit-outlined.svg';
import createIcon from '../create-icon';

const EditOutlined = createIcon(Icon);
export default React.memo(EditOutlined);
