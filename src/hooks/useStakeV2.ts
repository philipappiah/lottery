import { useCallback } from 'react';
import useGoFarm from './useGoFarm';
import { Farm } from '../go-farm';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useStake = (farm: Farm) => {
  const goFarm = useGoFarm();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, farm.depositToken.decimal);
      handleTransactionReceipt(
        goFarm.stakeV2(farm.pid, amountBn),
        `质押 ${amount} ${farm.depositTokenName} 到 ${farm.depositTokenName}`,
      );
    },
    [farm, goFarm,handleTransactionReceipt],
  );
  return { onStake: handleStake };
};

export default useStake;
