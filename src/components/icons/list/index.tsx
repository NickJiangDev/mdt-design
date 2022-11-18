import * as React from 'react';
import { ReactComponent as Icon } from './list.svg';
import createIcon from '../create-icon';

const List = createIcon(Icon);
export default React.memo(List);
