import { useCallback, useEffect, useState } from 'react';
import useGoFarm from './useGoFarm';
import { TokenStat } from '../go-farm/types';
import config from '../config';

const useGOTStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const goFarm = useGoFarm();

  const fetchCashPrice = useCallback(async () => {
    setStat(await goFarm.getGOTStatFromUniswap());
  }, [goFarm]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setStat, goFarm]);

  return stat;
};

export default useGOTStats;
