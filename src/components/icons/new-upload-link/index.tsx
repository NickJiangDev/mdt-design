import * as React from 'react';
import { ReactComponent as Icon } from './new-upload-link.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../new-upload-link-light`));

const NewUploadLink = createIcon([Icon, LightIcon]);
export default React.memo(NewUploadLink);
