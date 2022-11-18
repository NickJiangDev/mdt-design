import * as React from 'react';
import { ReactComponent as Icon } from './share-outlined.svg';
import createIcon from '../create-icon';

const ShareOutlined = createIcon(Icon);
export default React.memo(ShareOutlined);
