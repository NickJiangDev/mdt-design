import * as React from 'react';
import { ReactComponent as Icon } from './add-column.svg';
import createIcon from '../create-icon';

const AddColumn = createIcon(Icon);
export default React.memo(AddColumn);
