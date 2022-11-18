import * as React from 'react';
import { ReactComponent as Icon } from './folder-outlined.svg';
import createIcon from '../create-icon';

const FolderOutlined = createIcon(Icon);
export default React.memo(FolderOutlined);
