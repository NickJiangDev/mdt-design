import * as React from 'react';
import { ReactComponent as Icon } from './file-2.svg';
import createIcon from '../create-icon';

const File2 = createIcon(Icon);
export default React.memo(File2);
