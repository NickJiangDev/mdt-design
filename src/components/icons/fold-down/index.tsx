import * as React from 'react';
import { ReactComponent as Icon } from './fold-down.svg';
import createIcon from '../create-icon';

const FoldDown = createIcon(Icon);
export default React.memo(FoldDown);
