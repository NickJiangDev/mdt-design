import * as React from 'react';
import { ReactComponent as Icon } from './chart.svg';
import createIcon from '../create-icon';

const Chart = createIcon(Icon);
export default React.memo(Chart);
