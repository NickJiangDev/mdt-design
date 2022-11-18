import * as React from 'react';
import { ReactComponent as Icon } from './data-search.svg';
import createIcon from '../create-icon';

const DataSearch = createIcon(Icon);
export default React.memo(DataSearch);
