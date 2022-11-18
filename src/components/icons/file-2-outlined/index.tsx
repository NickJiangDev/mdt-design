import * as React from 'react';
import { ReactComponent as Icon } from './file-2-outlined.svg';
import createIcon from '../create-icon';

const File2Outlined = createIcon(Icon);
export default React.memo(File2Outlined);
