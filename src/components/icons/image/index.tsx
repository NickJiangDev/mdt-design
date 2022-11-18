import * as React from 'react';
import { ReactComponent as Icon } from './image.svg';
import createIcon from '../create-icon';

const Image = createIcon(Icon);
export default React.memo(Image);
