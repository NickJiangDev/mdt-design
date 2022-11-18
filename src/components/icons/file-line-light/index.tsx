import * as React from 'react';
import { ReactComponent as Icon } from './file-line-light.svg';
import createIcon from '../create-icon';

const FileLineLight = createIcon(Icon);
export default React.memo(FileLineLight);
