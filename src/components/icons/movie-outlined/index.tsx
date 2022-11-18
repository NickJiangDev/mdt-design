import * as React from 'react';
import { ReactComponent as Icon } from './movie-outlined.svg';
import createIcon from '../create-icon';

const MovieOutlined = createIcon(Icon);
export default React.memo(MovieOutlined);
