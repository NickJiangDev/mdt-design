import * as React from 'react';
import { ReactComponent as Icon } from './file.svg';
import createIcon from '../create-icon';

const File = createIcon(Icon);
export default React.memo(File);
