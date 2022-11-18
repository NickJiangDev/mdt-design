import * as React from 'react';
import { ReactComponent as Icon } from './ding-talk.svg';
import createIcon from '../create-icon';

const DingTalk = createIcon(Icon);
export default React.memo(DingTalk);
