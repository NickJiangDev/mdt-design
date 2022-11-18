import * as React from 'react';
import { ReactComponent as Icon } from './ruler.svg';
import createIcon from '../create-icon';

const Ruler = createIcon(Icon);
export default React.memo(Ruler);
