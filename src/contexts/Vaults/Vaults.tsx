import React, { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import Context from './context';
import useGoFarm from '../../hooks/useGoFarm';
import { Vault } from '../../go-farm';
import config, { vaultDefinitions } from '../../config';

const Vaults: React.FC = ({ children }) => {
  const [vaults, setVaults] = useState<Vault[]>([]);
  const goFarm = useGoFarm();

  const fetchPools = useCallback(async () => {
    const vaults: Vault[] = [];
    // const balance = await goFarm.getAllBalance();
    const apys = await goFarm.getVaultApys();
    const GOTapy = await goFarm.getGOTApy();
    // const balance = await goFarm.getVaultTVLs();
    const price = await goFarm.getVaultTVLPrice();
    const GOTprice = await goFarm.getGOTTVLPrice();
    // console.log('price',price)

    for (const vaultInfo of Object.values(vaultDefinitions)) {
      if (vaultInfo.finished) {
        if (!goFarm.isUnlocked) continue;
      }
      vaults.push({
        ...vaultInfo,
        address: config.MasterChef,
        depositToken: goFarm.externalTokens[vaultInfo.depositTokenName],
        earnToken: goFarm.externalTokens[vaultInfo.depositTokenName],
        apy:
          vaultInfo.id === 15
            ? BigNumber.from(GOTapy).mul(100).mul(52)
            : BigNumber.from(apys[vaultInfo.id]),
        balance:
          vaultInfo.id === 15 ? BigNumber.from(GOTprice) : BigNumber.from(price[vaultInfo.id]),
      });
    }
    vaults.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setVaults(vaults);
  }, [goFarm, setVaults]);

  useEffect(() => {
    if (goFarm) {
      fetchPools().catch((err) => console.log(`Failed to fetch pools: ${err.stack}`));
    }
  }, [goFarm, fetchPools]);

  return <Context.Provider value={{ vaults }}>{children}</Context.Provider>;
};

export default Vaults;
