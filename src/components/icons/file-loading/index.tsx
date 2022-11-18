import * as React from 'react';
import { ReactComponent as Icon } from './file-loading.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../file-loading-light`));

const FileLoading = createIcon([Icon, LightIcon]);
export default React.memo(FileLoading);
