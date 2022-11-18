import * as React from 'react';
import { ReactComponent as Icon } from './upload.svg';
import createIcon from '../create-icon';

const Upload = createIcon(Icon);
export default React.memo(Upload);
