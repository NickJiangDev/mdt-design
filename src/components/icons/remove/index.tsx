import * as React from 'react';
import { ReactComponent as Icon } from './remove.svg';
import createIcon from '../create-icon';

const Remove = createIcon(Icon);
export default React.memo(Remove);
