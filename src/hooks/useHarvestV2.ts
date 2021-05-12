import { useCallback } from 'react';
import useGoFarm from './useGoFarm';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { Farm } from '../go-farm';

const useHarvest = (farm: Farm) => {
  const goFarm = useGoFarm();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      goFarm.harvestV2(farm.pid),
      `从 ${farm.depositTokenName} 收获 ${farm.earnTokenName}`,
    );
  }, [farm, goFarm,handleTransactionReceipt]);

  return { onReward: handleReward };
};

export default useHarvest;
