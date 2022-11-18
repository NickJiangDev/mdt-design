import * as React from 'react';
import { ReactComponent as Icon } from './file-location-to-polygon-sql.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../file-location-to-polygon-sql-light`));

const FileLocationToPolygonSql = createIcon([Icon, LightIcon]);
export default React.memo(FileLocationToPolygonSql);
