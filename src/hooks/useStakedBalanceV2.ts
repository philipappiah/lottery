import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useGoFarm from './useGoFarm';
import config from '../config';

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const goFarm = useGoFarm();

  const fetchBalance = useCallback(async () => {
    const userInfo = await goFarm.stakedBalanceOnFarmV2(pid, goFarm.myAccount);
    setBalance(BigNumber.from(userInfo.amount));
  }, [ pid,goFarm]);

  useEffect(() => {
    if (goFarm?.isUnlocked) {
      fetchBalance().catch(err => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [pid, setBalance, goFarm,fetchBalance]);

  return balance;
};

export default useStakedBalance;
