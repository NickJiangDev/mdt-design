import * as React from 'react';
import { ReactComponent as Icon } from './align-hor-center.svg';
import createIcon from '../create-icon';

const AlignHorCenter = createIcon(Icon);
export default React.memo(AlignHorCenter);
