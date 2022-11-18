import * as React from 'react';
import { ReactComponent as Icon } from './list-view-echarts.svg';
import createIcon from '../create-icon';

const ListViewEcharts = createIcon(Icon);
export default React.memo(ListViewEcharts);
