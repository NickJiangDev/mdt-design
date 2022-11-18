import * as React from 'react';
import { ReactComponent as Icon } from './file-description-sql.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../file-description-sql-light`));

const FileDescriptionSql = createIcon([Icon, LightIcon]);
export default React.memo(FileDescriptionSql);
