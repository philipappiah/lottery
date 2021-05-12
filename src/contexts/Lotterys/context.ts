import { createContext } from 'react';
import { Lottery } from '../../go-farm';

export interface LotterysContext {
  lotterys: Lottery[];
}

const context = createContext<LotterysContext>({
  lotterys: [],
});

export default context;
