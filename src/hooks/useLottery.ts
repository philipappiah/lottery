import { useContext } from 'react';
import { Context as LotterysContext } from '../contexts/Lotterys';
import { Lottery ,ContractName} from '../go-farm';

const useLottery = (depositTokenName: ContractName): Lottery => {
  const { lotterys } = useContext(LotterysContext);
  return lotterys.find((lottery) => lottery.depositTokenName === depositTokenName);
};

export default useLottery;
