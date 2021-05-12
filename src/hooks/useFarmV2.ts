import { useContext } from 'react';
import { Context as FarmsContext } from '../contexts/FarmsV2';
import { Farm ,ContractName} from '../go-farm';

const useFarm = (depositTokenName: ContractName): Farm => {
  const { farmsV2 } = useContext(FarmsContext);
  return farmsV2.find((farm) => farm.depositTokenName === depositTokenName);
};

export default useFarm;
