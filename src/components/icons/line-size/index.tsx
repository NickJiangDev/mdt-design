import * as React from 'react';
import { ReactComponent as Icon } from './line-size.svg';
import createIcon from '../create-icon';

const LineSize = createIcon(Icon);
export default React.memo(LineSize);
