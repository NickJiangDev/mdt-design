import * as React from 'react';
import { ReactComponent as Icon } from './list-bulleted.svg';
import createIcon from '../create-icon';

const ListBulleted = createIcon(Icon);
export default React.memo(ListBulleted);
