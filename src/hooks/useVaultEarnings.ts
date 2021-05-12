import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useGoFarm from './useGoFarm';
import config from '../config';

const useVaultEarnings = (name: string) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const goFarm = useGoFarm();

  const fetchBalance = useCallback(async () => {
    const balance = await goFarm.earnedFromVault(name, goFarm.myAccount);
    setBalance(balance);
  }, [name, goFarm]);

  useEffect(() => {
    if (goFarm?.isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [name, goFarm, fetchBalance]);

  return balance;
};

export default useVaultEarnings;
