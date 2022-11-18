import * as React from 'react';
import { ReactComponent as Icon } from './file-line.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../file-line-light`));

const FileLine = createIcon([Icon, LightIcon]);
export default React.memo(FileLine);
