import * as React from 'react';
import { ReactComponent as Icon } from './image-2.svg';
import createIcon from '../create-icon';

const Image2 = createIcon(Icon);
export default React.memo(Image2);
