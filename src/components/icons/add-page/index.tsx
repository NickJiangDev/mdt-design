import * as React from 'react';
import { ReactComponent as Icon } from './add-page.svg';
import createIcon from '../create-icon';

const AddPage = createIcon(Icon);
export default React.memo(AddPage);
