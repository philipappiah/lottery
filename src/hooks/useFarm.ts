import { useContext } from 'react';
import { Context as FarmsContext } from '../contexts/Farms';
import { Farm ,ContractName} from '../go-farm';

const useFarm = (depositTokenName: ContractName): Farm => {
  const { farms } = useContext(FarmsContext);
  return farms.find((farm) => farm.depositTokenName === depositTokenName);
};

export default useFarm;
