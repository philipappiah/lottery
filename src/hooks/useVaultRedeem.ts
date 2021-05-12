import { useCallback } from 'react';
import useGoFarm from './useGoFarm';
import { Lottery } from '../go-farm';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (lottery: Lottery) => {
  const goFarm = useGoFarm();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(
      goFarm.vaultWithdrawAll(lottery.depositTokenName),
      `赎回 ${lottery.depositTokenName}`,
    );
  }, [lottery, goFarm, handleTransactionReceipt]);

  return { onRedeem: handleRedeem };
};

export default useRedeem;
