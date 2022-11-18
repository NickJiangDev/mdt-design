import * as React from 'react';
import { ReactComponent as Icon } from './new-customed-mobile.svg';
import createIcon from '../create-icon';

const NewCustomedMobile = createIcon(Icon);
export default React.memo(NewCustomedMobile);
