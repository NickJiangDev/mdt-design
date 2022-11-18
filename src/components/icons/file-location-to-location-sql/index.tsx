import * as React from 'react';
import { ReactComponent as Icon } from './file-location-to-location-sql.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../file-location-to-location-sql-light`));

const FileLocationToLocationSql = createIcon([Icon, LightIcon]);
export default React.memo(FileLocationToLocationSql);
