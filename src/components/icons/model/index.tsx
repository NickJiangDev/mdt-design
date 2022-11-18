import * as React from 'react';
import { ReactComponent as Icon } from './model.svg';
import createIcon from '../create-icon';

const Model = createIcon(Icon);
export default React.memo(Model);
