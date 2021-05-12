import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useGoFarm from './useGoFarm';
import config from '../config';

const useVaultStakedBalance = (name: string) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const goFarm = useGoFarm();

  const fetchBalance = useCallback(async () => {
    const userBalance = await goFarm.stakedBalanceOnVault(name, goFarm.myAccount);
    setBalance(userBalance);
  }, [ name,goFarm]);

  useEffect(() => {
    if (goFarm?.isUnlocked) {
      fetchBalance().catch(err => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [name, setBalance, goFarm,fetchBalance]);

  return balance;
};

export default useVaultStakedBalance;
