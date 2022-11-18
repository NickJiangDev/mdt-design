import * as React from 'react';
import { ReactComponent as Icon } from './new-sql.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../new-sql-light`));

const NewSql = createIcon([Icon, LightIcon]);
export default React.memo(NewSql);
