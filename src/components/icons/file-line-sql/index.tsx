import * as React from 'react';
import { ReactComponent as Icon } from './file-line-sql.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../file-line-sql-light`));

const FileLineSql = createIcon([Icon, LightIcon]);
export default React.memo(FileLineSql);
