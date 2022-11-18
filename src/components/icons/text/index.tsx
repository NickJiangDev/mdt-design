import * as React from 'react';
import { ReactComponent as Icon } from './text.svg';
import createIcon from '../create-icon';

const Text = createIcon(Icon);
export default React.memo(Text);
