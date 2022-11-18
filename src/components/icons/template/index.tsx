import * as React from 'react';
import { ReactComponent as Icon } from './template.svg';
import createIcon from '../create-icon';

import loadable from '@loadable/component';
const LightIcon = loadable(() => import(`../template-light`));

const Template = createIcon([Icon, LightIcon]);
export default React.memo(Template);
