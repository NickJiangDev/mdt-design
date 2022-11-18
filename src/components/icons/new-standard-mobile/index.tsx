import * as React from 'react';
import { ReactComponent as Icon } from './new-standard-mobile.svg';
import createIcon from '../create-icon';

const NewStandardMobile = createIcon(Icon);
export default React.memo(NewStandardMobile);
