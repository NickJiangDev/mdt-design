import * as React from 'react';
import { ReactComponent as Icon } from './file-location-to-location.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../file-location-to-location-light`));

const FileLocationToLocation = createIcon([Icon, LightIcon]);
export default React.memo(FileLocationToLocation);
