import * as React from 'react';
import { ReactComponent as Icon } from './file-loading-light.svg';
import createIcon from '../create-icon';

const FileLoadingLight = createIcon(Icon);
export default React.memo(FileLoadingLight);
