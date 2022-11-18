import * as React from 'react';
import { ReactComponent as Icon } from './select.svg';
import createIcon from '../create-icon';

const Search = createIcon(Icon);
export default React.memo(Search);
