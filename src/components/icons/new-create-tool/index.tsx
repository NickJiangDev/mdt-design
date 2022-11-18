import * as React from 'react';
import { ReactComponent as Icon } from './new-create-tool.svg';
import createIcon from '../create-icon';

const NewCreateTool = createIcon(Icon);
export default React.memo(NewCreateTool);
