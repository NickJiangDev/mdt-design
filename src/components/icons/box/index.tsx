import * as React from 'react';
import { ReactComponent as Icon } from './empty-box.svg';
import createIcon from '../create-icon';

const EmptyBox = createIcon(Icon);
export default React.memo(EmptyBox);
