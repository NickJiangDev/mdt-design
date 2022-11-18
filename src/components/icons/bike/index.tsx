import * as React from 'react';
import { ReactComponent as Icon } from './bike.svg';
import createIcon from '../create-icon';

const Bike = createIcon(Icon);
export default React.memo(Bike);
