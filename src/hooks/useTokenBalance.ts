import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import ERC20 from '../go-farm/ERC20';
import useGoFarm from './useGoFarm';
import config from '../config';

const useTokenBalance = (token: ERC20) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const goFarm = useGoFarm();

  const fetchBalance = useCallback(async () => {
    if(goFarm){
      if(token.symbol === 'HT'){
        setBalance(goFarm.balance)
      }else{
        setBalance(await token.balanceOf(goFarm.myAccount));
      }
    }
  }, [token,goFarm]);

  useEffect(() => {
    if (goFarm?.isUnlocked) {
      fetchBalance().catch((err) =>
        console.error(`Failed to fetch token balance: ${err.stack}`),
      );
      let refreshInterval = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [goFarm, token,fetchBalance]);

  return balance;
};

export default useTokenBalance;
