import { useContext } from 'react';
import { Context as LotterysContext } from '../contexts/Lotterys';

const useLotterys = () => {
  const { lotterys } = useContext(LotterysContext);
  return [lotterys];
};

export default useLotterys;
