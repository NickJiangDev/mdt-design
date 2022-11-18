import * as React from 'react';
import { ReactComponent as Icon } from './file-polygon-sql.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../file-polygon-sql-light`));

const FilePolygonSql = createIcon([Icon, LightIcon]);
export default React.memo(FilePolygonSql);
