import * as React from 'react';
import { ReactComponent as Icon } from './new-output.svg';
import createIcon from '../create-icon';

const NewOutput = createIcon(Icon);
export default React.memo(NewOutput);
