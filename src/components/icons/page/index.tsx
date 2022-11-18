import * as React from 'react';
import { ReactComponent as Icon } from './page.svg';
import createIcon from '../create-icon';

const Page = createIcon(Icon);
export default React.memo(Page);
