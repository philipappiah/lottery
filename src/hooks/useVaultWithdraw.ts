import { useCallback } from 'react';
import useGoFarm from './useGoFarm';
import { Vault } from '../go-farm';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useVaultWithdraw = (vault: Vault) => {
  const goFarm = useGoFarm();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, vault.depositToken.decimal);
      handleTransactionReceipt(
        goFarm.vaultUnstake(vault.depositTokenName, amountBn),
        `从 ${vault.depositTokenName} 取出 ${amount} ${vault.depositTokenName} `,
      );
    },
    [vault, goFarm,handleTransactionReceipt],
  );
  return { onWithdraw: handleWithdraw };
};

export default useVaultWithdraw;
