import * as React from 'react';
import { ReactComponent as Icon } from './add-square.svg';
import createIcon from '../create-icon';

const AddSquare = createIcon(Icon);
export default React.memo(AddSquare);
