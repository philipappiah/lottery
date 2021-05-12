import { createContext } from 'react';
import { Farm } from '../../go-farm';

export interface FarmsContext {
  farmsV2: Farm[];
}

const context = createContext<FarmsContext>({
  farmsV2: [],
});

export default context;
