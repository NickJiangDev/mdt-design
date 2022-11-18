import * as React from 'react';
import { ReactComponent as Icon } from './emoji-outlined.svg';
import createIcon from '../create-icon';

const EmojiOutlined = createIcon(Icon);
export default React.memo(EmojiOutlined);
