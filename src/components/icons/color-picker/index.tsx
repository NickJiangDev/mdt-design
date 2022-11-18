import * as React from 'react';
import { ReactComponent as Icon } from './color-picker.svg';
import createIcon from '../create-icon';

const ColorPicker = createIcon(Icon);
export default React.memo(ColorPicker);
