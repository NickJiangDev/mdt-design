import * as React from 'react';
import { ReactComponent as Icon } from './more.svg';
import createIcon from '../create-icon';

const More = createIcon(Icon);
export default React.memo(More);
