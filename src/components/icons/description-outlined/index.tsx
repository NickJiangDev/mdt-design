import * as React from 'react';
import { ReactComponent as Icon } from './description-outlined.svg';
import createIcon from '../create-icon';

const DescriptionOutlined = createIcon(Icon);
export default React.memo(DescriptionOutlined);
