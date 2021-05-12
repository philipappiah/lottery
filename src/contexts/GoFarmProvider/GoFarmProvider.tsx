import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import GoFarm from '../../go-farm';
import config from '../../config';
import { BigNumber } from 'ethers';

export interface GoFarmContext {
  goFarm?: GoFarm;
}

export const Context = createContext<GoFarmContext>({ goFarm: null });

export const GoFarmProvider: React.FC = ({ children }) => {
  const { ethereum, account,balance } = useWallet();
  const [goFarm, setGoFarm] = useState<GoFarm>();

  useEffect(() => {
    if (!goFarm) {
      const gofarm = new GoFarm(config);
      if (account) {
        // wallet was unlocked at initialization
        gofarm.unlockWallet(ethereum, account,BigNumber.from(balance));
      }
      setGoFarm(gofarm);
    } else if (account) {
      goFarm.unlockWallet(ethereum, account,BigNumber.from(balance));
    }
  }, [account,goFarm,ethereum,balance]);

  return <Context.Provider value={{ goFarm }}>{children}</Context.Provider>;
};
