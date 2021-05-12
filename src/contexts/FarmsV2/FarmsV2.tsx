import React, { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import Context from './context';
import useGoFarm from '../../hooks/useGoFarm';
import { Farm } from '../../go-farm';
import config, { farmDefinitions } from '../../config';

const FarmsV2: React.FC = ({ children }) => {
  const [farmsV2, setFarms] = useState<Farm[]>([]);
  const  goFarm = useGoFarm();

  const fetchPools = useCallback(async () => {
    const farmsV2: Farm[] = [];

    const apys = await goFarm.getApyV2();
    const poolPrices = await goFarm.getAllPoolPriceV2();
    const allocs = await goFarm.getAllAllocV2();


    for (const farmInfo of Object.values(farmDefinitions)) {
      if (farmInfo.finished) {
        if (! goFarm.isUnlocked) continue;

        // only show pools staked by user
        const {amount} = await  goFarm.stakedBalanceOnFarm(farmInfo.pid,  goFarm.myAccount);
        if (BigNumber.from(amount).lte(0)) {
          continue;
        }
      }
      farmsV2.push({
        ...farmInfo,
        address: config.MasterChefV2,
        depositToken:  goFarm.externalTokens[farmInfo.depositTokenName],
        earnToken:  goFarm.externalTokens[farmInfo.earnTokenName],
        TokenA_Address:  goFarm.externalTokens[farmInfo.TokenA].address,
        TokenB_Address:  "",
        apy: BigNumber.from(apys[farmInfo.pid]).mul(100).mul(365),
        poolPrice: BigNumber.from(poolPrices[farmInfo.pid]),
        alloc: BigNumber.from(allocs[farmInfo.pid])
      });
    }
    farmsV2.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setFarms(farmsV2);
  }, [ goFarm, setFarms]);

  useEffect(() => {
    if ( goFarm) {
      fetchPools()
        .catch(err => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [ goFarm, fetchPools]);

  return <Context.Provider value={{ farmsV2 }}>{children}</Context.Provider>;
};

export default FarmsV2;
