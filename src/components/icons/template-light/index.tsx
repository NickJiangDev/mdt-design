import * as React from 'react';
import { ReactComponent as Icon } from './template-light.svg';
import createIcon from '../create-icon';

const TemplateLight = createIcon(Icon);
export default React.memo(TemplateLight);
