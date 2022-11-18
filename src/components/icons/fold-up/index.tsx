import * as React from 'react';
import { ReactComponent as Icon } from './fold-up.svg';
import createIcon from '../create-icon';

const FoldUp = createIcon(Icon);
export default React.memo(FoldUp);
