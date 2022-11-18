import * as React from 'react';
import { ReactComponent as Icon } from './data-asset.svg';
import createIcon from '../create-icon';

const DataAsset = createIcon(Icon);
export default React.memo(DataAsset);
