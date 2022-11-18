import * as React from 'react';
import { ReactComponent as Icon } from './layers.svg';
import createIcon from '../create-icon';

const Layers = createIcon(Icon);
export default React.memo(Layers);
