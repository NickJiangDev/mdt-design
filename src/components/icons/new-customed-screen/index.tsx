import * as React from 'react';
import { ReactComponent as Icon } from './new-customed-screen.svg';
import createIcon from '../create-icon';

const NewCustomedScreen = createIcon(Icon);
export default React.memo(NewCustomedScreen);
