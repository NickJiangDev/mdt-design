import * as React from 'react';
import { ReactComponent as Icon } from './file-polygon.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../file-polygon-light`));

const FilePolygon = createIcon([Icon, LightIcon]);
export default React.memo(FilePolygon);
