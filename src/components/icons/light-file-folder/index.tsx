import * as React from 'react';
import { ReactComponent as Icon } from './light-file-folder.svg';
import createIcon from '../create-icon';

const LightFileFolder = createIcon(Icon);
export default React.memo(LightFileFolder);
