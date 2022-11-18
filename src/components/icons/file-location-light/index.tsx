import * as React from 'react';
import { ReactComponent as Icon } from './file-location-light.svg';
import createIcon from '../create-icon';

const FileLocationLight = createIcon(Icon);
export default React.memo(FileLocationLight);
