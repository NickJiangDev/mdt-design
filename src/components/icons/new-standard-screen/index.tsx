import * as React from 'react';
import { ReactComponent as Icon } from './new-standard-screen.svg';
import createIcon from '../create-icon';

const NewStandardScreen = createIcon(Icon);
export default React.memo(NewStandardScreen);
