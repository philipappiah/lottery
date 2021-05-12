import { BigNumber } from 'ethers';
import { type } from 'node:os';
import ERC20 from './ERC20';

export type ContractName = string;

export interface FarmInfo {
  name: string;
  depositTokenName: ContractName;
  earnTokenName: ContractName;
  TokenA: ContractName;
  TokenB: ContractName;
  sort: number;
  finished: boolean;
  pid: number;
}

export interface Farm extends FarmInfo {
  address: string;
  depositToken: ERC20;
  earnToken: ERC20;
  TokenA_Address: string;
  TokenB_Address: string;
  apy: BigNumber;
  poolPrice: BigNumber;
  alloc: BigNumber;
}

export type TokenStat = {
  priceInDAI: string;
  totalSupply: string;
};

export type UserInfo = {
  amount: string;
  rewardDebt: string;
};

export type StartTime = {
  startTime: Date;
}

export interface VaultInfo {
  name: string;
  depositTokenName: ContractName;
  sort: number;
  finished: boolean;
  id: number;
}

export interface Vault extends VaultInfo {
  address: string;
  depositToken: ERC20;
  earnToken: ERC20;
  apy: BigNumber;
  balance: BigNumber;
}

export interface LotteryInfo {
  name: string;
  depositTokenName: ContractName;
  sort: number;
  finished: boolean;
  id: number;
}

export interface Lottery extends LotteryInfo {
  address: string;
  depositToken: ERC20;
  earnToken: ERC20;
}

export type VaultDetial = {
  amount: BigNumber;
  tvl: BigNumber;
  apy: BigNumber;
};

export type VaultsDetial = {
  detial: {[address: string]: VaultDetial};
};

export type LotteryTime = {
  prevEpochTime: Date;
  nextEpochTime: Date;
  epoch: number;
};

export type TotalPot = {
  MTR : BigNumber;
  MUSD : BigNumber;
}

export type Allocations = {
  MTR : BigNumber[];
  MUSD : BigNumber[];
}