import * as React from 'react';
import { ReactComponent as Icon } from './print-image.svg';
import createIcon from '../create-icon';

const Preview = createIcon(Icon);
export default React.memo(Preview);
