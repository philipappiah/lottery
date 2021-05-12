import { Deployments } from './deployments';
import { ChainId } from 'goswap-sdk';

export type Configuration = {
  chainId: 101,
  etherscanUrl: string,
  defaultProvider: string,
  deployments: Deployments,
  externalTokens: {[contractName: string]: [string, number]};
  vaults: {[contractName: string]: string};
  lotterys: {[contractName: string]: string};
  MasterChef: string,
  MasterChefV2: string,
  LotteryAnalysis: string,
  GetApy: string,
  GetApyV2: string,
  GetVaultApy: string,
  GetGOTApy: string,
  config?: EthereumConfig,
  refreshInterval: number;
  gasLimitMultiplier: number;
};

export type EthereumConfig = {
  testing: boolean,
  autoGasMultiplier: number,
  defaultConfirmations: number,
  defaultGas: string,
  defaultGasPrice: string,
  ethereumNodeTimeout: number,
};

export const defaultEthereumConfig = {
  testing: false,
  autoGasMultiplier: 1.5,
  defaultConfirmations: 1,
  defaultGas: "6000000",
  defaultGasPrice: "1000000000",
  ethereumNodeTimeout: 10000,
};
