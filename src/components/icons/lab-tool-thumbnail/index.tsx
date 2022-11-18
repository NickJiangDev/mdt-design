import * as React from 'react';
import { ReactComponent as Icon } from './lab-tool-thumbnail.svg';
import createIcon from '../create-icon';

const LabToolThumbnail = createIcon(Icon);
export default React.memo(LabToolThumbnail);
