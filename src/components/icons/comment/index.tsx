import * as React from 'react';
import { ReactComponent as Icon } from './comment.svg';
import createIcon from '../create-icon';

const Comment = createIcon(Icon);
export default React.memo(Comment);
