import * as React from 'react';
import { ReactComponent as Icon } from './institution.svg';
import createIcon from '../create-icon';

const Institution = createIcon(Icon);
export default React.memo(Institution);
