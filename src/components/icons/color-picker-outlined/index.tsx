import * as React from 'react';
import { ReactComponent as Icon } from './color-picker-outlined.svg';
import createIcon from '../create-icon';

const ColorPickerOutlined = createIcon(Icon);
export default React.memo(ColorPickerOutlined);
