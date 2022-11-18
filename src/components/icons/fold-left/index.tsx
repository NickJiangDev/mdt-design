import * as React from 'react';
import { ReactComponent as Icon } from './fold-left.svg';
import createIcon from '../create-icon';

const FoldLeft = createIcon(Icon);
export default React.memo(FoldLeft);
