import * as React from 'react';
import { ReactComponent as Icon } from './card.svg';
import createIcon from '../create-icon';

const Card = createIcon(Icon);
export default React.memo(Card);
