import { useCallback } from 'react';
import useGoFarm from './useGoFarm';
import { Farm } from '../go-farm';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useWithdraw = (farm: Farm) => {
  const goFarm = useGoFarm();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, farm.depositToken.decimal);
      handleTransactionReceipt(
        goFarm.unstake(farm.pid,amountBn),
        `从 ${farm.depositTokenName} 取出 ${amount} ${farm.depositTokenName} `,
      );
    },
    [farm, goFarm,handleTransactionReceipt],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdraw;
