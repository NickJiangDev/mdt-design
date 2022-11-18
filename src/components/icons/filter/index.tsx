import * as React from 'react';
import { ReactComponent as Icon } from './filter.svg';
import createIcon from '../create-icon';

const Filter = createIcon(Icon);
export default React.memo(Filter);
