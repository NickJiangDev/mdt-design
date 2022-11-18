import * as React from 'react';
import { ReactComponent as Icon } from './format-quote.svg';
import createIcon from '../create-icon';

const FormatQuote = createIcon(Icon);
export default React.memo(FormatQuote);
