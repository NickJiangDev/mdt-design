import * as React from 'react';
import { ReactComponent as Icon } from './list-numbered.svg';
import createIcon from '../create-icon';

const ListNumbered = createIcon(Icon);
export default React.memo(ListNumbered);
