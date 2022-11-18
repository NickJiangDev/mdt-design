import * as React from 'react';
import { ReactComponent as Icon } from './cover-output.svg';
import createIcon from '../create-icon';

const CoverOutput = createIcon(Icon);
export default React.memo(CoverOutput);
