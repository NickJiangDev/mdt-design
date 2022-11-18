import * as React from 'react';
import { ReactComponent as Icon } from './code.svg';
import createIcon from '../create-icon';

const Code = createIcon(Icon);
export default React.memo(Code);
