import * as React from 'react';
import { ReactComponent as Icon } from './sql.svg';
import createIcon from '../create-icon';

const Sql = createIcon(Icon);
export default React.memo(Sql);
