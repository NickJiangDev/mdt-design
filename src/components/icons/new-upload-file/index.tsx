import * as React from 'react';
import { ReactComponent as Icon } from './new-upload-file.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../new-upload-file-light`));

const NewUploadFile = createIcon([Icon, LightIcon]);
export default React.memo(NewUploadFile);
