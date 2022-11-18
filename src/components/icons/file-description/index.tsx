import * as React from 'react';
import { ReactComponent as Icon } from './file-description.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../file-description-light`));

const FileDescription = createIcon([Icon, LightIcon]);
export default React.memo(FileDescription);
