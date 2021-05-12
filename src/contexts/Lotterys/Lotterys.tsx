import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import useGoFarm from '../../hooks/useGoFarm';
import { Lottery } from '../../go-farm';
import config, { lotteryDefinitions } from '../../config';

const Lotterys: React.FC = ({ children }) => {
  const [lotterys, setLotterys] = useState<Lottery[]>([]);
  const goFarm = useGoFarm();

  const fetchPools = useCallback(async () => {
    const lotterys: Lottery[] = [];
    // const balance = await goFarm.getAllBalance();
    // const apys = await goFarm.getLotteryApys();
    // const GOTapy = await goFarm.getGOTApy();
    // const balance = await goFarm.getLotteryTVLs();
    // const price = await goFarm.getLotteryTVLPrice();
    // const GOTprice = await goFarm.getGOTTVLPrice();
    for (const lotteryInfo of Object.values(lotteryDefinitions)) {
      if (lotteryInfo.finished) {
        if (!goFarm.isUnlocked) continue;
      }
      lotterys.push({
        ...lotteryInfo,
        address: config.MasterChef,
        depositToken: goFarm.externalTokens[lotteryInfo.depositTokenName],
        earnToken: goFarm.externalTokens[lotteryInfo.depositTokenName],
      });
    }
    lotterys.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setLotterys(lotterys);
  }, [goFarm, setLotterys]);

  useEffect(() => {
    if (goFarm) {
      fetchPools().catch((err) => console.log(`Failed to fetch pools: ${err.stack}`));
    }
  }, [goFarm, fetchPools]);

  return <Context.Provider value={{ lotterys }}>{children}</Context.Provider>;
};

export default Lotterys;
