import * as React from 'react';
import { ReactComponent as Icon } from './add-row.svg';
import createIcon from '../create-icon';

const AddRow = createIcon(Icon);
export default React.memo(AddRow);
