import { createContext } from 'react';
import { Farm } from '../../go-farm';

export interface FarmsContext {
  farms: Farm[];
}

const context = createContext<FarmsContext>({
  farms: [],
});

export default context;
