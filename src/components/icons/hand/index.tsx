import * as React from 'react';
import { ReactComponent as Icon } from './hand.svg';
import createIcon from '../create-icon';

const Hand = createIcon(Icon);
export default React.memo(Hand);
