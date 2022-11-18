import * as React from 'react';
import { ReactComponent as Icon } from './file-folder.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../light-file-folder`));

const FileFolder = createIcon([Icon, LightIcon]);
export default React.memo(FileFolder);
