import { useContext } from 'react';
import { Context as VaultsContext } from '../contexts/Vaults';
import { Vault ,ContractName} from '../go-farm';

const useVault = (depositTokenName: ContractName): Vault => {
  const { vaults } = useContext(VaultsContext);
  return vaults.find((vault) => vault.depositTokenName === depositTokenName);
};

export default useVault;
