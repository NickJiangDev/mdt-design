import * as React from 'react';
import { ReactComponent as Icon } from './car.svg';
import createIcon from '../create-icon';

const Car = createIcon(Icon);
export default React.memo(Car);
