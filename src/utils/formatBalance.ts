import { BigNumber } from 'ethers';

export const getDisplayBalance = (balance: BigNumber, decimals = 18, fractionDigits = 5) => {
  const number = getBalance(balance, decimals - fractionDigits);
  return (number / 10 ** fractionDigits).toFixed(fractionDigits);
};

export const getDisplayApy = (balance: BigNumber, decimals = 18, fractionDigits = 5) => {
  const number = getBalance(balance, decimals - fractionDigits);
  const origin = (number / 10 ** fractionDigits).toFixed(fractionDigits);
  // return (((Number(origin) + 1) ** 365 - 1) * 100).toFixed(2)
  return (Number(origin)* 100* 365).toFixed(2)
};

export const getDisplayApy2 = (balance: BigNumber, decimals = 18, fractionDigits = 5) => {
  const number = getBalance(balance, decimals - fractionDigits);
  const origin = (number / 10 ** fractionDigits).toFixed(fractionDigits);
  return (((Number(origin) + 1) ** 365 - 1) * 100).toFixed(2)
  // return (Number(origin)* 100).toFixed(2)
};


export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return getDisplayBalance(balance, decimals);
};

export function getBalance(balance: BigNumber, decimals = 18) : number {
  return BigNumber.from("10").div(BigNumber.from(10).pow(decimals)).toNumber();
}
