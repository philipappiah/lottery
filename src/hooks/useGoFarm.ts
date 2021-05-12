import { useContext } from 'react';
import { Context } from '../contexts/GoFarmProvider';

const useGoFarm = () => {
  const { goFarm } = useContext(Context);
  return goFarm;
};

export default useGoFarm;
