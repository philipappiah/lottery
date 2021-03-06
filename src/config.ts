import { ChainId } from 'goswap-sdk';
import { Configuration } from './go-farm/config';
import { FarmInfo, VaultInfo, LotteryInfo } from './go-farm';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 101,
    etherscanUrl: 'https://scan-warringstakes.meter.io',
    defaultProvider: 'https://rpctest.meter.io',
    MasterChef: '0xC9FAA89989bd6562dbc67f34F825028A79f4f1B1',
    MasterChefV2: '0xb6e8Df513dD634Bc033CdB3099448269728e8deE',
    GetApy: '0xE453Fd8FF38b46fBda57f236103f6336CBf50594',
    GetApyV2: '0x0FD83832b763371065cFA24e68d8BF50c8a225D5',
    GetVaultApy: '0xaE3a4402B987Ad29D5e7F17Bbb4fD22a713f7DaE',
    GetGOTApy: '0xD25dF71c0dD1291ff65A3279DD4C63a5Bd0ae0D4',
    LotteryAnalysis: '0xF84620e3e626ca5e2a07c29034B6C678470E9965',
    deployments: require('./go-farm/deployments/deployments.testnet.json'),
    externalTokens: {
      MTR: ['0x4cb6cEf87d8cADf966B455E8BD58ffF32aBA49D1',18],
      MUSD:['0x3e5a2A4812D319Ded22479A88ed708c6B55ca0b1',18],
      GOT: ['0xA7d5b5Dbc29ddef9871333AD2295B2E7D6F12391', 18],
      GOS: ['0x36b29B53c483bd00978D40126E614bb7e45d8354', 18],
      GOC: ['0x271B54EBe36005A7296894F819D626161C44825C', 18],
      USDT: ['0x4a0795da0044e083EA82207E6F8a75194A2f11D0', 18],
      mUSD: ['0x3e5a2A4812D319Ded22479A88ed708c6B55ca0b1', 8],
      BTC: ['0x4139d24c6C25Cc44F1F405405aC4BF44682F37C6', 18],
      ETH: ['0x6B958fe634e4bb5fe8Fd363E1D9E85C14e61fBF4', 18],
      HT: ['0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F', 18],
      DOT: ['0xE9ab18781dcB3709c45Edb72688706435B17052f', 18],
      'GOT_HUSD-LP': ['0xc31b9f33fb2c54b789c263781ccee9b23b747677', 18],
      'GOT_USDT-LP': ['0xb13598584a6b73644460e1bfacedcef95c17c650', 18],
      'GOT_BTC-LP': ['0x3c21d92c83de04d026db7795e656d8a247cb984d', 18],
      'GOT_ETH-LP': ['0x334c271f41ab4415032f37e6190c4f8f6a8527c8', 18],
      'GOT_HT-LP': ['0x61a02786895c9c4ac1c017247bcd6070f0e18e17', 18],
      'GOT_DOT-LP': ['0x704ba9f70560467e9fd868c040184d116e1b52bd', 18],
      'GOT_GOS-LP': ['0x0226a0a7493dad879fbed7aa60692fd593510f99', 18],
      'GOT_GOC-LP': ['0xb666d590a8593bfca34c557251a7445798320d6d', 18],
      'GOC_HUSD-LP': ['0x28bfcd3c234b710d93232b5e51a2e8b8a5bb9d2f', 18],
      'GOC_USDT-LP': ['0xe5c67f26c4112d07af265ab07994afdb34200738', 18],
      'GOC_BTC-LP': ['0x4e33a6db97d4b2b752af793fff1c977c6d3cc64e', 18],
      'GOC_ETH-LP': ['0xd8fb79abe7714c3d9829d58f4a21e62df12f2689', 18],
      'GOC_HT-LP': ['0xc93c141288340efc45d36e85ca40c2dca378d2d2', 18],
      'GOC_DOT-LP': ['0x93363d362da93acd4dbb2656f74bbaa7a6a0878c', 18],
      'GOS_HUSD-LP': ['0xd0e8d781fae230e3da6e45ed881c99ba639ca400', 18],
      'GOS_USDT-LP': ['0xf577e0caf94472801fbcbabb45e8b974e2439ea8', 18],
    },
    vaults: {
      HUSD: '0xAF0DA088d0c2fDc1ceD8A4484445e54B0ffC7B14',
      HT: '0x2F80931dC31003d6fB6Ed91BD4F4b43224D348C8',
      USDT: '0xCc555dfe688E3C9Ec5278f8ceD1846fEda8633f9',
    },
   
    lotterys:{
      MTR : '0xfBf7e9A83F3C8489a255AECD0D72De2035a7B777',
      MUSD : '0x65c11B19E924c514436C7b93edabDa989025d427'
    },
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1
  },
  production: {
    chainId: 101,
    etherscanUrl: 'https://scan-warringstakes.meter.io',
    defaultProvider: 'https://rpctest.meter.io',
    MasterChef: '0xC9FAA89989bd6562dbc67f34F825028A79f4f1B1',
    MasterChefV2: '0xb6e8Df513dD634Bc033CdB3099448269728e8deE',
    GetApy: '0xE453Fd8FF38b46fBda57f236103f6336CBf50594',
    GetApyV2: '0x0FD83832b763371065cFA24e68d8BF50c8a225D5',
    GetVaultApy: '0xaE3a4402B987Ad29D5e7F17Bbb4fD22a713f7DaE',
    GetGOTApy: '0xD25dF71c0dD1291ff65A3279DD4C63a5Bd0ae0D4',
    LotteryAnalysis: '0x67767CE0AC511232F2ee62bbAbCe7D54e09c6e7f',
    deployments: require('./go-farm/deployments/deployments.testnet.json'),
    externalTokens: {
      MTR: ['0x4cb6cEf87d8cADf966B455E8BD58ffF32aBA49D1',18],
      MUSD:['0x3e5a2A4812D319Ded22479A88ed708c6B55ca0b1',18],
      GOT: ['0xA7d5b5Dbc29ddef9871333AD2295B2E7D6F12391', 18],
      GOS: ['0x36b29B53c483bd00978D40126E614bb7e45d8354', 18],
      GOC: ['0x271B54EBe36005A7296894F819D626161C44825C', 18],
      USDT: ['0x4a0795da0044e083EA82207E6F8a75194A2f11D0', 18],
      mUSD: ['0x3e5a2A4812D319Ded22479A88ed708c6B55ca0b1', 8],
      BTC: ['0x4139d24c6C25Cc44F1F405405aC4BF44682F37C6', 18],
      ETH: ['0x6B958fe634e4bb5fe8Fd363E1D9E85C14e61fBF4', 18],
      HT: ['0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F', 18],
      DOT: ['0xE9ab18781dcB3709c45Edb72688706435B17052f', 18],
      'GOT_HUSD-LP': ['0xc31b9f33fb2c54b789c263781ccee9b23b747677', 18],
      'GOT_USDT-LP': ['0xb13598584a6b73644460e1bfacedcef95c17c650', 18],
      'GOT_BTC-LP': ['0x3c21d92c83de04d026db7795e656d8a247cb984d', 18],
      'GOT_ETH-LP': ['0x334c271f41ab4415032f37e6190c4f8f6a8527c8', 18],
      'GOT_HT-LP': ['0x61a02786895c9c4ac1c017247bcd6070f0e18e17', 18],
      'GOT_DOT-LP': ['0x704ba9f70560467e9fd868c040184d116e1b52bd', 18],
      'GOT_GOS-LP': ['0x0226a0a7493dad879fbed7aa60692fd593510f99', 18],
      'GOT_GOC-LP': ['0xb666d590a8593bfca34c557251a7445798320d6d', 18],
      'GOC_HUSD-LP': ['0x28bfcd3c234b710d93232b5e51a2e8b8a5bb9d2f', 18],
      'GOC_USDT-LP': ['0xe5c67f26c4112d07af265ab07994afdb34200738', 18],
      'GOC_BTC-LP': ['0x4e33a6db97d4b2b752af793fff1c977c6d3cc64e', 18],
      'GOC_ETH-LP': ['0xd8fb79abe7714c3d9829d58f4a21e62df12f2689', 18],
      'GOC_HT-LP': ['0xc93c141288340efc45d36e85ca40c2dca378d2d2', 18],
      'GOC_DOT-LP': ['0x93363d362da93acd4dbb2656f74bbaa7a6a0878c', 18],
      'GOS_HUSD-LP': ['0xd0e8d781fae230e3da6e45ed881c99ba639ca400', 18],
      'GOS_USDT-LP': ['0xf577e0caf94472801fbcbabb45e8b974e2439ea8', 18],
    },
    vaults: {
      HUSD: '0xAF0DA088d0c2fDc1ceD8A4484445e54B0ffC7B14',
      HT: '0x2F80931dC31003d6fB6Ed91BD4F4b43224D348C8',
      USDT: '0xCc555dfe688E3C9Ec5278f8ceD1846fEda8633f9',
    },
   
    lotterys:{
      MTR : '0x4cb6cEf87d8cADf966B455E8BD58ffF32aBA49D1',
      HUSD : '0x8A419Ef4941355476cf04933E90Bf3bbF2F73814'
    },
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1
  }
};

export const bankDefinitions: { [contractName: string]: FarmInfo } = {
  pool_0: {
    name: '????????????',
    depositTokenName: 'GOT_HUSD-LP',
    TokenA: 'GOT',
    TokenB: 'HUSD',
    earnTokenName: 'GOT',
    finished: false,
    sort: 1,
    pid: 0,
  },
  pool_1: {
    name: '????????????',
    depositTokenName: 'GOT_USDT-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOT',
    TokenB: 'USDT',
    finished: false,
    sort: 2,
    pid: 1,
  },
  pool_2: {
    name: '???????????????',
    depositTokenName: 'GOT_BTC-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOT',
    TokenB: 'BTC',
    finished: false,
    sort: 3,
    pid: 2,
  },
  pool_3: {
    name: '???????????????',
    depositTokenName: 'GOT_ETH-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOT',
    TokenB: 'ETH',
    finished: false,
    sort: 4,
    pid: 3,
  },
  pool_4: {
    name: '???????????????',
    depositTokenName: 'GOT_HT-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOT',
    TokenB: 'HT',
    finished: false,
    sort: 5,
    pid: 4,
  },
  pool_5: {
    name: '???????????????',
    depositTokenName: 'GOT_DOT-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOT',
    TokenB: 'DOT',
    finished: false,
    sort: 6,
    pid: 5,
  },
  pool_6: {
    name: '???????????????',
    depositTokenName: 'GOT_GOS-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOT',
    TokenB: 'GOS',
    finished: false,
    sort: 7,
    pid: 6,
  },
  pool_7: {
    name: '???????????????',
    depositTokenName: 'GOT_GOC-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOT',
    TokenB: 'GOC',
    finished: false,
    sort: 8,
    pid: 7,
  },
  pool_8: {
    name: '???????????????',
    depositTokenName: 'GOC_HUSD-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOC',
    TokenB: 'HUSD',
    finished: false,
    sort: 9,
    pid: 8,
  },
  pool_9: {
    name: '???????????????',
    depositTokenName: 'GOC_USDT-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOC',
    TokenB: 'USDT',
    finished: false,
    sort: 10,
    pid: 9,
  },
  pool_10: {
    name: '??????????????????',
    depositTokenName: 'GOC_BTC-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOC',
    TokenB: 'BTC',
    finished: false,
    sort: 11,
    pid: 10,
  },
  pool_11: {
    name: '??????????????????',
    depositTokenName: 'GOC_ETH-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOC',
    TokenB: 'ETH',
    finished: false,
    sort: 12,
    pid: 11,
  },
  pool_12: {
    name: '???????????????',
    depositTokenName: 'GOC_HT-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOC',
    TokenB: 'HT',
    finished: false,
    sort: 13,
    pid: 12,
  },
  pool_13: {
    name: '??????????????????',
    depositTokenName: 'GOC_DOT-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOC',
    TokenB: 'DOT',
    finished: false,
    sort: 14,
    pid: 15,
  },
  pool_14: {
    name: '???????????????',
    depositTokenName: 'GOS_HUSD-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOS',
    TokenB: 'HUSD',
    finished: false,
    sort: 15,
    pid: 13,
  },
  pool_15: {
    name: '??????????????????',
    depositTokenName: 'GOS_USDT-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOS',
    TokenB: 'USDT',
    finished: false,
    sort: 16,
    pid: 14,
  },
};
export const farmDefinitions: { [contractName: string]: FarmInfo } = {
  pool_0: {
    name: '????????????',
    depositTokenName: 'GOT_HUSD-LP',
    TokenA: 'GOT',
    TokenB: 'HUSD',
    earnTokenName: 'GOT',
    finished: false,
    sort: 1,
    pid: 0,
  },
  pool_1: {
    name: '????????????',
    depositTokenName: 'GOT_USDT-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOT',
    TokenB: 'USDT',
    finished: false,
    sort: 2,
    pid: 1,
  },
  pool_2: {
    name: '???????????????',
    depositTokenName: 'GOT_BTC-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOT',
    TokenB: 'BTC',
    finished: false,
    sort: 3,
    pid: 2,
  },
  pool_3: {
    name: '???????????????',
    depositTokenName: 'GOT_ETH-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOT',
    TokenB: 'ETH',
    finished: false,
    sort: 4,
    pid: 3,
  },
  pool_4: {
    name: '???????????????',
    depositTokenName: 'GOT_HT-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOT',
    TokenB: 'HT',
    finished: false,
    sort: 5,
    pid: 4,
  },
  pool_5: {
    name: '???????????????',
    depositTokenName: 'GOT_DOT-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOT',
    TokenB: 'DOT',
    finished: false,
    sort: 6,
    pid: 5,
  },
  pool_6: {
    name: '???????????????',
    depositTokenName: 'GOT_GOS-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOT',
    TokenB: 'GOS',
    finished: false,
    sort: 7,
    pid: 6,
  },
  pool_7: {
    name: '???????????????',
    depositTokenName: 'GOT_GOC-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOT',
    TokenB: 'GOC',
    finished: false,
    sort: 8,
    pid: 7,
  },
  pool_8: {
    name: '???????????????',
    depositTokenName: 'GOC_HUSD-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOC',
    TokenB: 'HUSD',
    finished: false,
    sort: 9,
    pid: 8,
  },
  pool_9: {
    name: '???????????????',
    depositTokenName: 'GOC_USDT-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOC',
    TokenB: 'USDT',
    finished: false,
    sort: 10,
    pid: 9,
  },
  pool_10: {
    name: '??????????????????',
    depositTokenName: 'GOC_BTC-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOC',
    TokenB: 'BTC',
    finished: false,
    sort: 11,
    pid: 10,
  },
  pool_11: {
    name: '??????????????????',
    depositTokenName: 'GOC_ETH-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOC',
    TokenB: 'ETH',
    finished: false,
    sort: 12,
    pid: 11,
  },
  pool_12: {
    name: '???????????????',
    depositTokenName: 'GOC_HT-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOC',
    TokenB: 'HT',
    finished: false,
    sort: 13,
    pid: 12,
  },
  pool_13: {
    name: '??????????????????',
    depositTokenName: 'GOC_DOT-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOC',
    TokenB: 'DOT',
    finished: false,
    sort: 14,
    pid: 13,
  },
  pool_14: {
    name: '???????????????',
    depositTokenName: 'GOS_HUSD-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOS',
    TokenB: 'HUSD',
    finished: false,
    sort: 15,
    pid: 14,
  },
  pool_15: {
    name: '??????????????????',
    depositTokenName: 'GOS_USDT-LP',
    earnTokenName: 'GOT',
    TokenA: 'GOS',
    TokenB: 'USDT',
    finished: false,
    sort: 16,
    pid: 15,
  },
  pool_16: {
    name: 'HUSD?????????',
    depositTokenName: 'gHUSD',
    earnTokenName: 'GOT',
    TokenA: 'HUSD',
    TokenB: 'VAULT',
    finished: false,
    sort: 17,
    pid: 16,
  },
  pool_17: {
    name: 'HT?????????',
    depositTokenName: 'gHT',
    earnTokenName: 'GOT',
    TokenA: 'HT',
    TokenB: 'VAULT',
    finished: false,
    sort: 18,
    pid: 17,
  },
  pool_18: {
    name: 'USDT?????????',
    depositTokenName: 'gUSDT',
    earnTokenName: 'GOT',
    TokenA: 'USDT',
    TokenB: 'VAULT',
    finished: false,
    sort: 19,
    pid: 18,
  },
  pool_19: {
    name: 'BTC?????????',
    depositTokenName: 'gBTC',
    earnTokenName: 'GOT',
    TokenA: 'BTC',
    TokenB: 'VAULT',
    finished: false,
    sort: 20,
    pid: 19,
  },
  pool_20: {
    name: 'ETH?????????',
    depositTokenName: 'gETH',
    earnTokenName: 'GOT',
    TokenA: 'ETH',
    TokenB: 'VAULT',
    finished: false,
    sort: 21,
    pid: 20,
  },
  pool_21: {
    name: 'BCH?????????',
    depositTokenName: 'gBCH',
    earnTokenName: 'GOT',
    TokenA: 'BCH',
    TokenB: 'VAULT',
    finished: false,
    sort: 22,
    pid: 21,
  },
  pool_22: {
    name: 'LTC?????????',
    depositTokenName: 'gLTC',
    earnTokenName: 'GOT',
    TokenA: 'LTC',
    TokenB: 'VAULT',
    finished: false,
    sort: 23,
    pid: 22,
  },
  pool_23: {
    name: 'DOT Pahalanx',
    depositTokenName: 'gDOT',
    earnTokenName: 'GOT',
    TokenA: 'DOT',
    TokenB: 'VAULT',
    finished: false,
    sort: 24,
    pid: 23,
  },
  pool_24: {
    name: 'HPT Phalanax',
    depositTokenName: 'gHPT',
    earnTokenName: 'GOT',
    TokenA: 'HPT',
    TokenB: 'VAULT',
    finished: false,
    sort: 25,
    pid: 24,
  },
  pool_25: {
    name: 'FIL Phalanx',
    depositTokenName: 'gFIL',
    earnTokenName: 'GOT',
    TokenA: 'FIL',
    TokenB: 'VAULT',
    finished: false,
    sort: 26,
    pid: 25,
  },
  pool_26: {
    name: 'MDX Phalanx',
    depositTokenName: 'gMDX',
    earnTokenName: 'GOT',
    TokenA: 'MDX',
    TokenB: 'VAULT',
    finished: false,
    sort: 27,
    pid: 26,
  },
  pool_27: {
    name: 'UNI Phalanx',
    depositTokenName: 'gUNI',
    earnTokenName: 'GOT',
    TokenA: 'UNI',
    TokenB: 'VAULT',
    finished: false,
    sort: 28,
    pid: 27,
  },
  pool_28: {
    name: 'YFI Phalanx',
    depositTokenName: 'gYFI',
    earnTokenName: 'GOT',
    TokenA: 'YFI',
    TokenB: 'VAULT',
    finished: false,
    sort: 29,
    pid: 28,
  },
  pool_29: {
    name: 'LINK Phalanx',
    depositTokenName: 'gLINK',
    earnTokenName: 'GOT',
    TokenA: 'LINK',
    TokenB: 'VAULT',
    finished: false,
    sort: 30,
    pid: 29,
  },
  pool_30: {
    name: 'BETH Phalanx',
    depositTokenName: 'gBETH',
    earnTokenName: 'GOT',
    TokenA: 'BETH',
    TokenB: 'VAULT',
    finished: false,
    sort: 31,
    pid: 30,
  },
};
export const vaultDefinitions: { [contractName: string]: VaultInfo } = {
  pool_00: {
    name: 'GOT',
    depositTokenName: 'GOT',
    finished: false,
    sort: 0,
    id: 15,
  },
  pool_0: {
    name: 'HUSD',
    depositTokenName: 'HUSD',
    finished: false,
    sort: 1,
    id: 0,
  },
  pool_1: {
    name: 'HT',
    depositTokenName: 'HT',
    finished: false,
    sort: 2,
    id: 1,
  },
  pool_2: {
    name: 'USDT',
    depositTokenName: 'USDT',
    finished: false,
    sort: 3,
    id: 2,
  },
  pool_3: {
    name: 'BTC',
    depositTokenName: 'BTC',
    finished: false,
    sort: 4,
    id: 3,
  },
  pool_4: {
    name: 'ETH',
    depositTokenName: 'ETH',
    finished: false,
    sort: 5,
    id: 4,
  },
  pool_5: {
    name: 'BCH',
    depositTokenName: 'BCH',
    finished: false,
    sort: 6,
    id: 5,
  },
  pool_6: {
    name: 'LTC',
    depositTokenName: 'LTC',
    finished: false,
    sort: 7,
    id: 6,
  },
  pool_7: {
    name: 'DOT',
    depositTokenName: 'DOT',
    finished: false,
    sort: 8,
    id: 7,
  },
  pool_8: {
    name: 'HPT',
    depositTokenName: 'HPT',
    finished: false,
    sort: 9,
    id: 8,
  },
  pool_9: {
    name: 'FIL',
    depositTokenName: 'FIL',
    finished: false,
    sort: 10,
    id: 9,
  },
  pool_10: {
    name: 'MDX',
    depositTokenName: 'MDX',
    finished: false,
    sort: 11,
    id: 10,
  },
  pool_11: {
    name: 'UNI',
    depositTokenName: 'UNI',
    finished: false,
    sort: 12,
    id: 11,
  },
  pool_12: {
    name: 'YFI',
    depositTokenName: 'YFI',
    finished: false,
    sort: 13,
    id: 12,
  },
  pool_13: {
    name: 'LINK',
    depositTokenName: 'LINK',
    finished: false,
    sort: 14,
    id: 13,
  },
  pool_14: {
    name: 'BETH',
    depositTokenName: 'BETH',
    finished: false,
    sort: 15,
    id: 14,
  },
};
export const lotteryDefinitions: { [contractName: string]: LotteryInfo } = {
  pool_1: {
    name: 'MUSD',
    depositTokenName: 'MUSD',
    finished: false,
    sort: 0,
    id: 0,
  },
  pool_0: {
    name: 'MTR',
    depositTokenName: 'MTR',
    finished: false,
    sort: 1,
    id: 15,
  }
 
};
// export default configurations[process.env.NODE_ENV || "development"];
// export default configurations["production"];
export default configurations["development"];