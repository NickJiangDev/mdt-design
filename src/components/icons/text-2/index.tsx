import * as React from 'react';
import { ReactComponent as Icon } from './text-2.svg';
import createIcon from '../create-icon';

const Text2 = createIcon(Icon);
export default React.memo(Text2);
