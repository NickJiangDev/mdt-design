import * as React from 'react';
import { ReactComponent as Icon } from './re-cached.svg';
import createIcon from '../create-icon';

const ReCached = createIcon(Icon);
export default React.memo(ReCached);
