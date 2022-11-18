import * as React from 'react';
import { ReactComponent as Icon } from './echarts.svg';
import createIcon from '../create-icon';

const Echarts = createIcon(Icon);
export default React.memo(Echarts);
