import * as React from 'react';
import { ReactComponent as Icon } from './file-location.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../file-location-light`));

const FileLocation = createIcon([Icon, LightIcon]);
export default React.memo(FileLocation);
