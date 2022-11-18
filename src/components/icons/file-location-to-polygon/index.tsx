import * as React from 'react';
import { ReactComponent as Icon } from './file-location-to-polygon.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../file-location-to-polygon-light`));

const FileLocationToPolygon = createIcon([Icon, LightIcon]);
export default React.memo(FileLocationToPolygon);
