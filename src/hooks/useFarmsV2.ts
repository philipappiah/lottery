import { useContext } from 'react';
import { Context as FarmsV2Context } from '../contexts/FarmsV2';

const useFarmsV2 = () => {
  const { farmsV2 } = useContext(FarmsV2Context);
  return [farmsV2];
};

export default useFarmsV2;
