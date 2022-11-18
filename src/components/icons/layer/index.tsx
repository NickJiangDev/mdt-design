import * as React from 'react';
import { ReactComponent as Icon } from './layer.svg';
import createIcon from '../create-icon';

const Layer = createIcon(Icon);
export default React.memo(Layer);
