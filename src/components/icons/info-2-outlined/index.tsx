import * as React from 'react';
import { ReactComponent as Icon } from './info-2-outlined.svg';
import createIcon from '../create-icon';

const Info2Outlined = createIcon(Icon);
export default React.memo(Info2Outlined);
