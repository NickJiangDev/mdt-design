import * as React from 'react';
import { ReactComponent as Icon } from './form.svg';
import createIcon from '../create-icon';

const Form = createIcon(Icon);
export default React.memo(Form);
