import * as React from 'react';
import { ReactComponent as Icon } from './supplier.svg';
import createIcon from '../create-icon';

const Supplier = createIcon(Icon);
export default React.memo(Supplier);
