import * as React from 'react';
import { ReactComponent as Icon } from './image-outlined.svg';
import createIcon from '../create-icon';

const ImageOutlined = createIcon(Icon);
export default React.memo(ImageOutlined);
