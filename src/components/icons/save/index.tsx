import * as React from 'react';
import { ReactComponent as Icon } from './save.svg';
import createIcon from '../create-icon';

const Save = createIcon(Icon);
export default React.memo(Save);
