import * as React from 'react';
import { ReactComponent as Icon } from './movie.svg';
import createIcon from '../create-icon';

const Movie = createIcon(Icon);
export default React.memo(Movie);
