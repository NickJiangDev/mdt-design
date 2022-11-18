import * as React from 'react';
import { ReactComponent as Icon } from './layer-outlined.svg';
import createIcon from '../create-icon';

const LayerOutlined = createIcon(Icon);
export default React.memo(LayerOutlined);
