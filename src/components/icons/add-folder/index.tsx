import * as React from 'react';
import { ReactComponent as Icon } from './add-folder.svg';
import createIcon from '../create-icon';

const AddFolder = createIcon(Icon);
export default React.memo(AddFolder);
