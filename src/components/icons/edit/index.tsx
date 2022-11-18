import * as React from 'react';
import { ReactComponent as Icon } from './edit.svg';
import createIcon from '../create-icon';

const Edit = createIcon(Icon);
export default React.memo(Edit);
