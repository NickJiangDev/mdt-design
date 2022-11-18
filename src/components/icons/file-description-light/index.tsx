import * as React from 'react';
import { ReactComponent as Icon } from './file-description-light.svg';
import createIcon from '../create-icon';

const FileDescriptionLight = createIcon(Icon);
export default React.memo(FileDescriptionLight);
