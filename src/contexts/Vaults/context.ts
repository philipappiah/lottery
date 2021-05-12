import { createContext } from 'react';
import { Vault } from '../../go-farm';

export interface VaultsContext {
  vaults: Vault[];
}

const context = createContext<VaultsContext>({
  vaults: [],
});

export default context;
