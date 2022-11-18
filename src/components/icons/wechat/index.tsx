import * as React from 'react';
import { ReactComponent as Icon } from './wechat.svg';
import createIcon from '../create-icon';

const Wechat = createIcon(Icon);
export default React.memo(Wechat);
