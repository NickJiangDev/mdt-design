import * as React from 'react';
import { ReactComponent as Icon } from './lab-model-thumbnail.svg';
import createIcon from '../create-icon';

const LabModelThumbnail = createIcon(Icon);
export default React.memo(LabModelThumbnail);
