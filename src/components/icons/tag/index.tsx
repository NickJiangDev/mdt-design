import * as React from 'react';
import { ReactComponent as Icon } from './tag.svg';
import createIcon from '../create-icon';

const Tag = createIcon(Icon);
export default React.memo(Tag);
