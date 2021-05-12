import { useCallback } from 'react';
import useGoFarm from './useGoFarm';
import { Farm } from '../go-farm';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (farm: Farm) => {
  const goFarm = useGoFarm();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(goFarm.emergencyWithdraw(farm.pid), `赎回 ${farm.depositTokenName}`);
  }, [farm, goFarm,handleTransactionReceipt]);

  return { onRedeem: handleRedeem };
};

export default useRedeem;
