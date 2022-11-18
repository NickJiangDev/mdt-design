import * as React from 'react';
import { ReactComponent as Icon } from './equal-sign.svg';
import createIcon from '../create-icon';

const EqualSign = createIcon(Icon);
export default React.memo(EqualSign);
