import * as React from 'react';
import { ReactComponent as Icon } from './new-upload-streaming.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../new-upload-streaming-light`));

const NewUploadStreaming = createIcon([Icon, LightIcon]);
export default React.memo(NewUploadStreaming);
