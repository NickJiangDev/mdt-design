import * as React from 'react';
import { ReactComponent as Icon } from './bookmark.svg';
import createIcon from '../create-icon';

const Bookmark = createIcon(Icon);
export default React.memo(Bookmark);
