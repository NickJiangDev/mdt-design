import * as React from 'react';
import { ReactComponent as Icon } from './folder.svg';
import createIcon from '../create-icon';

const Folder = createIcon(Icon);
export default React.memo(Folder);
