import * as React from 'react';
import { ReactComponent as Icon } from './new-markdown.svg';
import createIcon from '../create-icon';

const NewMarkdown = createIcon(Icon);
export default React.memo(NewMarkdown);
