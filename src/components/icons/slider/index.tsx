import * as React from 'react';
import { ReactComponent as Icon } from './slider.svg';
import createIcon from '../create-icon';

const Slider = createIcon(Icon);
export default React.memo(Slider);
