import { useCallback } from 'react';
import useGoFarm from './useGoFarm';
import { Vault } from '../go-farm';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useStake = (vault: Vault) => {
  const goFarm = useGoFarm();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, vault.depositToken.decimal);
      handleTransactionReceipt(
        goFarm.vaultStake(vault.depositTokenName, amountBn),
        `质押 ${amount} ${vault.depositTokenName} 到 ${vault.depositTokenName}`,
      );
    },
    [vault, goFarm,handleTransactionReceipt],
  );
  return { onStake: handleStake };
};

export default useStake;
