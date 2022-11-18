import * as React from 'react';
import { ReactComponent as Icon } from './unfold-less.svg';
import createIcon from '../create-icon';

const UnfoldLess = createIcon(Icon);
export default React.memo(UnfoldLess);
