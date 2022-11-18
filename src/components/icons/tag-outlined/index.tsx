import * as React from 'react';
import { ReactComponent as Icon } from './tag-outlined.svg';
import createIcon from '../create-icon';

const TagOutlined = createIcon(Icon);
export default React.memo(TagOutlined);
