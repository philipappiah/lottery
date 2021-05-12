import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useGoFarm from './useGoFarm';
import config from '../config';

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const goFarm = useGoFarm();

  const fetchBalance = useCallback(async () => {
    const balance = await goFarm.earnedFromFarm(pid, goFarm.myAccount);
    setBalance(balance);
  }, [ pid,goFarm]);

  useEffect(() => {
    if (goFarm?.isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [pid, goFarm,fetchBalance]);

  return balance;
};

export default useEarnings;
