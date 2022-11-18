import * as React from 'react';
import { ReactComponent as Icon } from './new-data-lake.svg';
import createIcon from '../create-icon';

const NewDataLake = createIcon(Icon);
export default React.memo(NewDataLake);
