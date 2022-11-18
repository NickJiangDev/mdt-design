import * as React from 'react';
import { ReactComponent as Icon } from './loading.svg';
import createIcon from '../create-icon';

const Loading = createIcon(Icon);
export default React.memo(Loading);
