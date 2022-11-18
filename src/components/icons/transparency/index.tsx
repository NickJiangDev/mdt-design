import * as React from 'react';
import { ReactComponent as Icon } from './transparency.svg';
import createIcon from '../create-icon';

const Transparency = createIcon(Icon);
export default React.memo(Transparency);
