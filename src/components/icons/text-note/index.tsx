import * as React from 'react';
import { ReactComponent as Icon } from './text-note.svg';
import createIcon from '../create-icon';

const TextNote = createIcon(Icon);
export default React.memo(TextNote);
