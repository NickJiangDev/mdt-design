import * as React from 'react';
import { DmcAnchor } from './Anchor';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnchorContext = React.createContext<DmcAnchor>(null as any);

export default AnchorContext;
