import * as React from 'react';
import { ReactComponent as Icon } from './unfold-more.svg';
import createIcon from '../create-icon';

const UnfoldMore = createIcon(Icon);
export default React.memo(UnfoldMore);
