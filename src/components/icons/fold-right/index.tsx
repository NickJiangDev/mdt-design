import * as React from 'react';
import { ReactComponent as Icon } from './fold-right.svg';
import createIcon from '../create-icon';

const FoldRight = createIcon(Icon);
export default React.memo(FoldRight);
